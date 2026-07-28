const mongoose = require('mongoose');

const connectDB = async () => {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  const connect = async () => {
    try {
      await mongoose.connect(mongodbUri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed; retrying in 5 seconds:', error.message);
      setTimeout(connect, 5000);
    }
  };

  mongoose.connection.on('disconnected', () => console.error('MongoDB disconnected; retrying'));
  mongoose.connection.on('error', (error) => console.error('MongoDB error:', error.message));
  await connect();
};

module.exports = connectDB;
