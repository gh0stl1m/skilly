const Router = require('koa-router');
const Boom = require('boom');
const compose = require('koa-compose');

// Load endpoints
const healthyChecks = require('./healthyChecks');

const allowedMethods = {
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed(),
};

module.exports = () => {
  const router = new Router();

  // Register endpoints into the router
  router.use(healthyChecks().routes());

  return compose([router.routes(), router.allowedMethods(allowedMethods)]);
};