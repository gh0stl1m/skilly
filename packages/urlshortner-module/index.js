const shortID = require('shortid');

const { URLModel } = require('./domains');
const { urlUseCases } = require('./useCases');

module.exports = {
  createShortUrl: urlUseCases.shortUrlGenerator({ URLModel, idGenerator: shortID }),
  readUrlByHash: urlUseCases.readUrlByHash({ URLModel }),
};
