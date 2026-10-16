const mongoose = require('mongoose');

// Windows DNS on this development machine times out on Atlas SRV lookups
// (mongodb+srv), although normal hostname lookups work. Use Atlas's seed list
// locally so the driver can resolve each host through the OS resolver.
const getDevelopmentMongoUri = (uri) => {
  if (process.env.NODE_ENV === 'production' || !uri.startsWith('mongodb+srv://')) return uri;

  const match = uri.match(/^mongodb\+srv:\/\/([^/?#]+)(.*)$/);
  if (!match) return uri;

  const authority = match[1];
  const atIndex = authority.lastIndexOf('@');
  const credentials = atIndex === -1 ? '' : authority.slice(0, atIndex + 1);
  const hostname = authority.slice(atIndex + 1).toLowerCase();
  if (hostname !== 'jdsolutions-cluster.pwsxfgw.mongodb.net') return uri;

  const hosts = [
    'ac-xjj2nxm-shard-00-00.pwsxfgw.mongodb.net:27017',
    'ac-xjj2nxm-shard-00-01.pwsxfgw.mongodb.net:27017',
    'ac-xjj2nxm-shard-00-02.pwsxfgw.mongodb.net:27017',
  ].join(',');
  const standardUri = `mongodb://${credentials}${hosts}${match[2]}`;
  const [base, rawQuery = ''] = standardUri.split('?');
  const options = new URLSearchParams(rawQuery);
  if (!options.has('authSource')) options.set('authSource', 'admin');
  if (!options.has('replicaSet')) options.set('replicaSet', 'atlas-aieww5-shard-0');
  if (!options.has('tls')) options.set('tls', 'true');
  return `${base}?${options.toString()}`;
};

const connectDB = async () => {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not configured');
  }
  const connectionUri = getDevelopmentMongoUri(mongodbUri);

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
      await mongoose.connect(connectionUri, {
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
