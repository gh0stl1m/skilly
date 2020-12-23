const { createShortUrl } = require('@skilly/urlshortner-module');
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
]

module.exports = {
  shortUrlGenerator,
};
