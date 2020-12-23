const supportedEnvironments = {
  PRODUCTION: "production",
  DEVELOP: "develop"
};

const errorTypes = {
  URL_NOT_PROVIDED: 'URL_NOT_PROVIDED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  HASH_IS_REQUIRED: 'HASH_IS_REQUIRED',
}

module.exports = {
  supportedEnvironments,
  errorTypes,
}