const serverConf = require('../config/server');
const server = require('./delivery/http/server');
const { logger } = require('./utils');

const serverPort = serverConf.port || 8081;

server.listen(serverPort, (err) => {
  if (err) {
    logger.error(`[sk-api-gw]: Error initializing server: ${err.message}`);
  } else {
    logger.info(`[sk-api-gw]: Server running at port: ${serverPort}`);
  }
});
