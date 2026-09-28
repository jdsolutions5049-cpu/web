const session = require('express-session');
const crypto = require('crypto');

class MongoSessionStore extends session.Store {
  constructor(mongoose, { collectionName = 'web_sessions', ttlSeconds = 60 * 60 * 2 } = {}) {
    super();
    this.mongoose = mongoose;
    this.collectionName = collectionName;
    this.ttlSeconds = ttlSeconds;
    this.ensureIndex();
    mongoose.connection.on('connected', () => this.ensureIndex());
  }

  getCollection() {
    const { connection } = this.mongoose;
    return connection.readyState === 1 && connection.db
      ? connection.db.collection(this.collectionName)
      : null;
  }

  storageKey(sid) {
    return crypto.createHmac('sha256', process.env.SESSION_SECRET).update(sid).digest('hex');
  }

  ensureIndex() {
    const collection = this.getCollection();
    if (!collection) return;
    collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(error => {
      console.error('Session expiry index could not be created:', error.message);
    });
  }

  get(sid, callback) {
    const collection = this.getCollection();
    if (!collection) return callback(null, null);
    collection.findOne({ _id: this.storageKey(sid), expiresAt: { $gt: new Date() } })
      .then(record => callback(null, record ? JSON.parse(record.session) : null))
      .catch(callback);
  }

  set(sid, sessionData, callback = () => {}) {
    const collection = this.getCollection();
    if (!collection) return callback(new Error('Session database is unavailable'));
    const expiresAt = sessionData.cookie?.expires
      ? new Date(sessionData.cookie.expires)
      : new Date(Date.now() + this.ttlSeconds * 1000);
    collection.updateOne(
      { _id: this.storageKey(sid) },
      { $set: { session: JSON.stringify(sessionData), expiresAt } },
      { upsert: true }
    ).then(() => callback()).catch(callback);
  }

  touch(sid, sessionData, callback = () => {}) {
    const collection = this.getCollection();
    if (!collection) return callback();
    const expiresAt = sessionData.cookie?.expires
      ? new Date(sessionData.cookie.expires)
      : new Date(Date.now() + this.ttlSeconds * 1000);
    collection.updateOne({ _id: this.storageKey(sid) }, { $set: { expiresAt } })
      .then(() => callback()).catch(callback);
  }

  destroy(sid, callback = () => {}) {
    const collection = this.getCollection();
    if (!collection) return callback();
    collection.deleteOne({ _id: this.storageKey(sid) }).then(() => callback()).catch(callback);
  }
}

module.exports = MongoSessionStore;
