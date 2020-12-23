const {
  logger,
  BusinessError,
  constants: { errorTypes },
  validators,
} = require('../utils');

/**
 * ShortUrlGenerator creates a short version of a given URL 
 * @param {originalUrl} String
 * @param {fullHostnameURL} String
 * 
 * @returns a short url with a hash.
 */
const shortUrlGenerator = ({ URLModel, idGenerator }) => async (originalUrl, fullHostnameURL) => {
  if (!validators.isValidUrl(originalUrl) || !validators.isValidUrl(fullHostnameURL)) {
    logger.error('[sk-urlshortner-module]: the URL provided is not valid');
    throw new BusinessError(errorTypes.ORIGINAL_URL_NOT_FOUND, 'sk-urlshortner-module');
  }

  logger.info(`[sk-urlshortner-module]: Creating short url for ${originalUrl}`);

  let shortUrl;
  try {
    shortUrl = await URLModel.create({
      originalUrl,
      hash: idGenerator.generate(),
    });
  } catch (err) {
  logger.error(`[sk-urlshortner-module]: Error creating short url: ${err.message}`);

  throw new BusinessError(errorTypes.DATABASE_ERROR, 'sk-urlshortner-module');
  }

  return `${fullHostnameURL}/${shortUrl.hash}`;
}

module.exports = {
  shortUrlGenerator,
};
