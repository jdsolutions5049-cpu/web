const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const MongoSessionStore = require('./middleware/mongoSessionStore');
const { adminCsrfProtection } = require('./middleware/security');

dotenv.config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const pageController = require('./controllers/pageController');
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  throw new Error('SESSION_SECRET is missing or too short. Set a persistent random value of at least 32 characters in the hosting environment.');
}
if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured.');
}
if (process.env.ADMIN_PASSWORD.length < 14) {
  const warning = 'ADMIN_PASSWORD is shorter than the recommended 14 characters; replace it with a unique passphrase.';
  if (isProduction) throw new Error(warning);
  console.warn(warning);
}
if (process.env.TRUST_PROXY_HOPS) {
  const proxyHops = Number(process.env.TRUST_PROXY_HOPS);
  if (!Number.isInteger(proxyHops) || proxyHops < 1) throw new Error('TRUST_PROXY_HOPS must be a positive integer.');
  app.set('trust proxy', proxyHops);
} else if (isProduction) app.set('trust proxy', 1);
app.disable('x-powered-by');

const isBrowserSameOriginRequest = (req) => {
  const host = req.get('host') || '';
  const origin = (req.headers.origin || '').replace(/\/$/, '');
  const referer = (req.headers.referer || '').replace(/\/$/, '');
  if (!host) return false;
  if (origin) return origin === `http://${host}` || origin === `https://${host}`;
  if (!referer) return false;
  try { return new URL(referer).host === host; } catch { return false; }
};

app.use((req, res, next) => {
  const contentSecurityPolicy = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net; style-src-attr 'unsafe-inline'; script-src 'self'; connect-src 'self'";
  res.set({
    'Content-Security-Policy': isProduction ? `${contentSecurityPolicy}; upgrade-insecure-requests` : contentSecurityPolicy,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
  });
  if (isProduction && req.secure) res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

const allowedOrigins = new Set([
  ...(isProduction ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000']),
  'https://www.jdsolutionss.com', 'https://jdsolutionss.com',
  ...(process.env.APP_ORIGINS || '').split(',').map(origin => origin.trim()).filter(Boolean),
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    callback(null, allowedOrigins.has(origin) ? origin : false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Serve the sitemap dynamically so optional pages (such as JDS-SAT) are only
// listed while they are available to visitors. This must precede static files.
app.get('/sitemap.xml', pageController.sitemap);
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use('/vendor/three', express.static(path.join(__dirname, 'node_modules/three/build')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));
app.use(express.json({ limit: '32kb' }));
const sessionMiddleware = require('express-session')({
  name: isProduction ? '__Host-jds.sid' : 'jds.sid',
  store: new MongoSessionStore(mongoose),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { httpOnly: true, sameSite: 'lax', secure: isProduction, path: '/', maxAge: 2 * 60 * 60 * 1000 },
});
app.use('/admin', sessionMiddleware);
app.use('/api/admin', sessionMiddleware);
app.use((req, res, next) => {
  if (req.path.startsWith('/admin') || req.path.startsWith('/api/admin')) res.set('Cache-Control', 'no-store');
  next();
});
app.use(adminCsrfProtection);
app.use((req, res, next) => {
  const isApiRoute = req.path.startsWith('/api');
  const isStateMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && (
    req.path === '/enquiry' ||
    req.path === '/contact' ||
    req.path === '/admin/login' ||
    req.path.startsWith('/admin') ||
    req.path.startsWith('/api')
  );

  if (isApiRoute || isStateMutation) {
    const allowRequest = isBrowserSameOriginRequest(req) || req.path === '/api/health';
    if (!allowRequest) {
      return res.status(403).json({ error: 'Forbidden: browser-only request is required.' });
    }
  }

  next();
});
app.get('/api/health', (req, res) => {
  const databaseReady = require('mongoose').connection.readyState === 1;
  res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'degraded',
    database: databaseReady ? 'connected' : 'disconnected',
  });
});

app.use((req, res, next) => {
  // Authentication only checks environment credentials and must remain available
  // while MongoDB is still connecting during a cold start.
  const isLoginRequest = req.path === '/api/admin/login';
  if (req.path.startsWith('/api') && require('mongoose').connection.readyState !== 1 && req.path !== '/api/health' && !isLoginRequest) {
    return res.status(503).json({ error: 'The service is temporarily unavailable. Please try again.' });
  }
  next();
});

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.use((error, req, res, next) => {
  console.error('Request failed:', { method: req.method, path: req.path, name: error.name, code: error.code });
  if (res.headersSent) return next(error);
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500 ? error.status : 500;
  const message = status === 413 ? 'The submitted request is too large.' : (status < 500 ? 'The request could not be processed.' : 'An unexpected server error occurred.');
  if (req.path.startsWith('/api')) return res.status(status).json({ error: message });
  res.status(status).render('error', { message });
});

connectDB().catch((error) => console.error('Database setup failed:', error.message));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
