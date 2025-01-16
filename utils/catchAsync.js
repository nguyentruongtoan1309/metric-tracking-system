const APIError = require('./errors');
const logger = require('./logger');

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(`catchAsync: ${req.method}-${req.url}`, err);
    return next(
      new APIError({
        message: err.message,
        stack: err.stack,
        errors: err,
        status: err.status,
      }),
    );
  });
};

module.exports = catchAsync;
