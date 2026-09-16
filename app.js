const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

const isBrowserSameOriginRequest = (req) => {
  const host = req.get('host') || '';
  const origin = (req.headers.origin || '').replace(/\/$/, '');
  const referer = (req.headers.referer || '').replace(/\/$/, '');
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const browserLike = /mozilla|chrome|safari|firefox|edge|opera/i.test(userAgent);
  const sameOrigin = !!host && (
    origin === `http://${host}` ||
    origin === `https://${host}` ||
    referer.startsWith(`http://${host}/`) ||
    referer.startsWith(`https://${host}/`)
  );

  return browserLike && sameOrigin;
};

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://www.jdsolutionss.com', 'https://jdsolutionss.com'];
    callback(null, allowed.includes(origin) ? origin : false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET || 'jd-solutions-development-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: false },
}));
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
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

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
  console.error('Unhandled application error:', error);
  if (req.path.startsWith('/api')) return res.status(500).json({ error: 'An unexpected server error occurred.' });
  res.status(500).render('error', { message: 'An unexpected server error occurred.' });
});

connectDB().catch((error) => console.error('Database setup failed:', error.message));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
