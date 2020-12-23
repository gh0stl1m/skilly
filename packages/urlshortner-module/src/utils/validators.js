const logger = require('./logger');

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch(err) {
    logger.error('[sk-urlshortner-module]: The URL is not valid');
    return false;
  }

  return true;
}

module.exports = { isValidUrl };
