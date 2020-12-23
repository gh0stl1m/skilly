const dotenv = require('dotenv');

const { supportedEnvironments } = require('../utils/constants');
let environment;
let path;
const env = '.skenv';

switch (process.env.NODE_ENV) {
  case supportedEnvironments.PRODUCTION:
    environment = '';
    path = `/src/${env}`;
    break;
  case supportedEnvironments.DEVELOP: 
    environment = 'DEV_';
    path = `/src/${env}`;
    break;

  default:
    environment = 'TEST_';
    path = `${process.env.HOME}/${env}`;
    break;
}

// Configure dotenv
dotenv.config({ path });

module.exports = environment;
