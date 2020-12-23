const winston = require('winston');

const { supportedEnvironments } = require('./constants');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== supportedEnvironments.PRODUCTION) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
};

module.exports = logger;
