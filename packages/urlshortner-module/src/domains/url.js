const { Schema } = require('mongoose');

const dbConnection = require('../respositories/mongoDB/dbClient');

const UrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  hash: { type: String, required: true },
}, { timestamps: true });

UrlSchema.index({ hash: 1 });

module.exports = dbConnection.model('url', UrlSchema);
