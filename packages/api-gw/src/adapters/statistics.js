const { readStatisticsByURlId } = require('@skilly/statistics-module');

const { logger } = require('../utils');

const readUrlStatistics = [
  async (ctx, next) => {
    ctx.checkParams('urlId')
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
    const { urlId } = ctx.params;

    logger.info('[sk-api-gw]: Getting URL statistics');
    const dataUrl = await readStatisticsByURlId(urlId, { counter: 1 });

    if (!dataUrl) {
      logger.error('[sk-api-gw]: Statistics not found');
      return ctx.serverResponse()
        .addError({
          statusCode: 404,
          message: "The statistics for the URL ID does not exist",
        });
    };

    return ctx.serverResponse()
      .addData({
        statusCode: 200,
        data: dataUrl,
        entity: 'statistics',
      });
  },
]

module.exports = {
  readUrlStatistics,
}