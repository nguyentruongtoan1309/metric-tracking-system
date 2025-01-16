const catchAsync = require('../utils/catchAsync');
const APIError = require('../utils/errors');
const metricValidations = require('./metric');
const userValidations = require('./user');
const { status: httpStatus } = require('http-status');

const validate = (schema) =>
  catchAsync(async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      throw new APIError({ message: err.message, status: httpStatus.BAD_REQUEST });
    }
  });

module.exports = {
  validate,
  metricValidations,
  userValidations,
};
