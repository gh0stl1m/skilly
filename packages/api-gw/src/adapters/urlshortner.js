const { createShortUrl, readUrlByHash } = require('@skilly/urlshortner-module');
const { increaseUrlCounter } = require('@skilly/statistics-module');

const { logger } = require('../utils');

const shortUrlGenerator = [
  async (ctx, next) => {
    ctx.checkBody('url')
      .notEmpty();
    
      return ctx.checkValidate(next);
  },
  async (ctx, next) => {
    try {
      return await next();
    } catch (err) {
      return ctx.serverResponse()
        .addError({
          message: err.message,
        });
    }
  },
  async (ctx) => {
    const {
      url,
    } = ctx.request.body;
    const baseUrl = `${ctx.protocol}://${ctx.request.host}`;
    logger.info('[sk-api-gw]: Creating short URL');
    const shortUrl = await createShortUrl(url, baseUrl);

    return ctx.serverResponse()
      .addData({
        statusCode: 201,
        data: {
          link: shortUrl,
        },
        entity: 'url',
      });
  },
];

const readOriginalUrl = [
  async (ctx, next) => {
    ctx.checkParams('hash')
      .notEmpty();

    return ctx.checkValidate(next);
  },
  async (ctx, next) => {
    try {
      return await next();
    } catch (err) {
      return ctx.serverResponse()
        .addError({
          message: err.message,
        });
    }
  },
  async (ctx) => {
    const { hash } = ctx.params;

    logger.info('[sk-api-gw]: Getting original URL');
    const dataUrl = await readUrlByHash(hash, { originalUrl: 1 });

    if (!dataUrl) {
      logger.error('[sk-api-gw]: URL not found');
      return ctx.serverResponse()
        .addError({
          statusCode: 404,
          message: "The URL does not exists",
        });
    };

    increaseUrlCounter(dataUrl._id)
      .then(() => logger.info('[sk-api-gw]: URL usage reported success'))
      .catch(err => logger.error(`[sk-api-gw]: Something went wrong reporting statistics ${err.message}`));

    return ctx.redirect(dataUrl.originalUrl);
  }
]

module.exports = {
  shortUrlGenerator,
  readOriginalUrl,
};
