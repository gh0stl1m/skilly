const { Schema } = require('mongoose');

const dbConnection = require('../repositories/mongoDB/dbClient');

const StatisticsSchema = new Schema({
  counter: { type: Number, required: true },
  url: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = dbConnection.model('statistics', StatisticsSchema);
