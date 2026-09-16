const mongoose = require('mongoose');

const connectDB = async () => {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  let reconnectTimer = null;
  let connecting = false;

  const scheduleReconnect = () => {
    if (reconnectTimer || mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) return;
    console.error('MongoDB disconnected; retrying in 5 seconds');
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, 5000);
  };

  const connect = async () => {
    if (connecting || mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) return;
    connecting = true;
    try {
      await mongoose.connect(mongodbUri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      scheduleReconnect();
    } finally {
      connecting = false;
    }
  };

  mongoose.connection.on('disconnected', scheduleReconnect);
  mongoose.connection.on('error', (error) => console.error('MongoDB error:', error.message));
  await connect();
};

module.exports = connectDB;
