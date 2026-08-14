const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

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

const clientBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('Unhandled API error:', error);
  res.status(500).json({ error: 'An unexpected server error occurred.' });
});

connectDB().catch((error) => console.error('Database setup failed:', error.message));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
