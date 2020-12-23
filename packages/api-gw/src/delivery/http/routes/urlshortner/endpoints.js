const Router = require('koa-router');

const { urlShortner } = require('../../../../adapters');

const router = new Router({
  prefix: '/',
});

module.exports = () => {
  router.post('/', ...urlShortner.shortUrlGenerator);

  return router;
};
