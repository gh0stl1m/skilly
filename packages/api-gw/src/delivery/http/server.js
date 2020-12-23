const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const koaValidate = require('koa-validate');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const cors = require('kcors');

const { payloadValidator, serverResponse } = require('./middlewares');

const routes = require('./routes');

const app = new Koa();

app
  .use(helmet())
  .use(bodyParser())
  .use(cors({ allowMethods: 'GET,POST' }))
  .use(compress())
  .use(conditional())
  .use(etag())
  .use(payloadValidator)
  .use(serverResponse);

koaValidate(app);
app.use(routes());

module.exports = app;
