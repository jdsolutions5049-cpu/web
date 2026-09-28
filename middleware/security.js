const crypto = require('crypto');

const sameToken = (provided, expected) => {
  if (typeof provided !== 'string' || typeof expected !== 'string') return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
};

const createRateLimiter = ({ windowMs, limit, message }) => {
  const clients = new Map();
  let lastCleanup = Date.now();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    let client = clients.get(key);
    if (!client || now - client.startedAt >= windowMs) {
      client = { startedAt: now, count: 0 };
      clients.set(key, client);
    }
    client.count += 1;
    if (now - lastCleanup > windowMs) {
      for (const [clientKey, entry] of clients) {
        if (now - entry.startedAt >= windowMs) clients.delete(clientKey);
      }
      lastCleanup = now;
    }
    if (client.count > limit) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((windowMs - (now - client.startedAt)) / 1000))));
      return res.status(429).json({ error: message || 'Too many requests. Please try again later.' });
    }
    next();
  };
};

const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: 'Too many sign-in attempts. Wait 15 minutes and try again.',
});
const submissionRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  limit: 15,
  message: 'Too many submissions. Please wait before trying again.',
});

const adminCsrfProtection = (req, res, next) => {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  const isWebAdminMutation = req.path.startsWith('/admin/') && req.path !== '/admin/login';
  const isApiAdminMutation = req.path.startsWith('/api/admin/') && req.path !== '/api/admin/login';
  if (!isWebAdminMutation && !isApiAdminMutation) return next();
  if (!req.session?.admin) return next();

  const provided = req.get('x-csrf-token') || req.body?._csrf;
  if (!sameToken(provided, req.session.csrfToken)) {
    if (isWebAdminMutation && req.accepts('html')) {
      return res.status(403).render('error', { message: 'Your security token expired. Sign in again and retry this action.' });
    }
    return res.status(403).json({ error: 'Security token is missing or expired. Refresh and try again.' });
  }
  next();
};

module.exports = { createRateLimiter, loginRateLimiter, submissionRateLimiter, adminCsrfProtection, sameToken };
