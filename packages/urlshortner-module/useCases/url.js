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
 * @returns a String with a short url with a hostname an a hasg.
 */
const shortUrlGenerator = ({ URLModel, idGenerator }) => async (originalUrl, fullHostnameURL) => {
  if (!validators.isValidUrl(originalUrl) || !validators.isValidUrl(fullHostnameURL)) {
    logger.error('[sk-urlshortner-module]: the URL provided is not valid');
    throw new BusinessError(errorTypes.URL_NOT_PROVIDED, 'sk-urlshortner-module');
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

/**
 * 
 * @param {hash} String
 * @param {Projection} Object - Parameters to be retrieved from the DB
 * 
 * @returns an Object with the data of the URL otherwise undefined  
 */
const readUrlByHash = ({ URLModel }) => async(hash, projection = { _id: 1 }) =>  {
  if (!hash) {
    logger.error('[sk-urlshortner-module]: Error the hash parameter is required');
    throw new BusinessError(errorTypes.HASH_IS_REQUIRED, 'sk-urlshortner-module');
  }

  logger.info(`[sk-urlshortner-module]: Reading url for hash ${hash}`);
  const dataURL = await URLModel.findOne({ hash }, projection);

  return dataURL;
}

module.exports = {
  shortUrlGenerator,
  readUrlByHash,
};
