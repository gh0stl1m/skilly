const prefix = require('./environment');

module.exports = {
  port: process.env[`${prefix}SERVER_PORT`],
};
