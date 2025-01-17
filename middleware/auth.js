const { jwtConfig } = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const APIError = require('../utils/errors');
const { status: httpStatus } = require('http-status');

function verifyToken(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], jwtConfig.SECRET_KEY, function (err, decode) {
      if (err) {
        throw new APIError({ status: httpStatus.UNAUTHORIZED, message: 'Unauthorized' });
      }
      User.findByPk(decode.id).then((user, err) => {
        if (err) {
          throw new APIError(err.stack || err.message);
        } else {
          req.user = user;
          next();
        }
      });
    });
  } else {
    throw new APIError({ status: httpStatus.UNAUTHORIZED, message: httpStatus['403_MESSAGE'] });
  }
}

async function auth(req, res, next) {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  return new Promise(() => {
    passport.authenticate('jwt', { session: true }, (err, user) => {
      if (user) {
        req.user = user;
        res.locals.user = user;
        return next();
      }
      return next(new APIError({ status: httpStatus.UNAUTHORIZED, message: 'Unauthorized' }));
    })(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(new APIError(err)));
}

module.exports = { verifyToken, auth };
