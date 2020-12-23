const supportedEnvironments = {
  PRODUCTION: "production",
  DEVELOP: "develop"
};

const errorTypes = {
  DATABASE_ERROR: 'DATABASE_ERROR',
  URL_ID_IS_REQUIRED: 'URL_ID_IS_REQUIRED',
}

module.exports = {
  supportedEnvironments,
  errorTypes,
}