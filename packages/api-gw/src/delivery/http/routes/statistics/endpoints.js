const Router = require('koa-router');

const { statistics } = require('../../../../adapters');

const router = new Router({
  prefix: '/statistics',
});

module.exports = () => {
  router.get('/:urlId', ...statistics.readUrlStatistics);

  return router;
};