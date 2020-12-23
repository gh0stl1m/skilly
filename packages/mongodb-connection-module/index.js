const Mongoose = require('mongoose');

const config = require('./config/database');
const logger = require('./utils/logger');

Mongoose.Promise = Bluebird;

const db = Mongoose.createConnection(config.mongodb.uri, {
  auth: {
    user: config.mongodb.user,
    password: config.mongodb.pass,
  },
  poolSize: 10,
});


db.on('error', (err) => {
  logger.error(`(sk-mongoconnection-module): connection error event: ${err.message}`);
  process.exit(1);
});

db.once('open', () => logger.info('(sk-mongoconnection-module): connection opened with DB'));

db.on('connected', () => logger.info(`(sk-mongoconnection-module): Mongoose connection is open to: ${config.mongodb.uri}`));

db.on('disconnected', () => logger.info('(sk-mongoconnection-module): Mongoose connection is disconnected'));

process.on('SIGINT', () => {
  db.close(() => {
    logger.info('(sk-mongoconnection-module): Mongoose connection is disconnected due to application termination');
    process.exit(1);
  });
});

module.exports = db;