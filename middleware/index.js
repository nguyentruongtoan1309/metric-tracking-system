const { errorHandler, errorConverter } = require('./errorHandler');
const authJWT = require('./auth');
const rateLimiter = require('./rateLimiter');
const responseFormatter = require('./responseFormatter');

module.exports = {
  errorHandler,
  errorConverter,
  responseFormatter,
  ...authJWT,
  rateLimiter,
};
