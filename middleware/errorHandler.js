const { status: httpStatus } = require('http-status');
const ApiError = require('../utils/errors');
const { JsonWebTokenError } = require('jsonwebtoken');

const errorConverter = (err, req, res, next) => {
  let error = err;
  const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || httpStatus[statusCode];

  if (!(error instanceof ApiError)) {
    error = new ApiError({ status: statusCode, message, isPublic: true, errors: err });
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { status: statusCode } = err || {};

  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  if (err.errors instanceof JsonWebTokenError) {
    statusCode = httpStatus.UNAUTHORIZED;
  }

  const response = {
    code: statusCode,
    message: err.message,
    isSuccess: false,
    data: null,
  };

  logger.error(`IP-${req.socket.remoteAddress} | ${req.method}-${req.url} ERROR: `, {
    stack: err.stack,
    message: err.message,
  });

  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
