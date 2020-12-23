const Router = require('koa-router');

const { healthyChecks } = require('../../../../adapters');

const router = new Router({
  prefix: '/health',
});

module.exports = () => {
  router.get('/', ...healthyChecks.serverStatus);

  return router;
};
