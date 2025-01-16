const APIError = require('../utils/errors');
const logger = require('../utils/logger');

const responseFormatter = (req, res, next) => {
  try {
    const oldSend = res.send;

    res.send = function () {
      const response = isJsonString(arguments[0]) ? JSON.parse(arguments[0]) : { isSuccess: false };
      if (response.isSuccess === undefined) {
        arguments[0] = JSON.stringify({
          isSuccess: true,
          data: JSON.parse(arguments[0]),
          code: res.statusCode,
          message: null,
        });
      }
      oldSend.apply(res, arguments);
    };

    next();
  } catch (err) {
    logger.error('Response formater ERROR: ', err.message || err.stack);
    next(new APIError({ message: err.message, stack: err.stack }));
  }
};

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = responseFormatter;
