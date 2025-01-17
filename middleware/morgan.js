const morgan = require('morgan');
const logger = require('../utils/logger');

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      time: new Date().toLocaleString(),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      contentLength: tokens.res(req, res, 'content-length'),
      responseTime: Number.parseFloat(tokens['response-time'](req, res)),
      ipAddress: req.socket.remoteAddress,
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.trace(`incoming request`, data);
      },
    },
  },
);

module.exports = morganMiddleware;
