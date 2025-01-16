require('dotenv').config();
require('./globals');

const express = require('express');
const { dbInitialize } = require('./models');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

const routes = require('./routes');
const PORT = process.env.PORT || 5000;

const { responseFormatter, errorHandler, errorConverter, rateLimiter } = require('./middleware');
const { jwtStrategy } = require('./utils/auth');
const APIError = require('./utils/errors');

const app = express();
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(helmet());
app.use(responseFormatter);
app.use(rateLimiter);

app.use('/api/v1/', routes);
app.all('*', (req, res, next) => {
  const err = new APIError({ status: 404, message: `Route ${req.originalUrl} not found` });
  next(err);
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}`);
  await dbInitialize();
});
