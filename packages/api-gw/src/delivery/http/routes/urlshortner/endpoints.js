const Router = require('koa-router');

const { urlShortner } = require('../../../../adapters');

const router = new Router();

module.exports = () => {
  router.post('/', ...urlShortner.shortUrlGenerator);
  router.get('/:hash', ...urlShortner.readOriginalUrl);

  return router;
};
