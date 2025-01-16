const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken, generateAccessToken, verifyJwt } = require('../utils/auth');
const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const APIError = require('../utils/errors');

const signUp = catchAsync(async (req, res) => {
  const { password, username } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const foundUser = await User.findOne({ where: { username } });

  if (foundUser) {
    throw new APIError({ status: httpStatus.BAD_REQUEST, message: 'User already existed!' });
  }

  const user = await User.create({ ...req.body, password: hashedPassword });
  res.status(httpStatus.CREATED).send(user);
});

const signIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    delete user.password;
    const { accessToken, refreshToken } = await signToken(user.toJSON());

    res.send({ accessToken, refreshToken });
  } else {
    throw new APIError({ status: httpStatus.UNAUTHORIZED, message: 'Invalid username or password' });
  }
});

const refreshAccessToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  const decoded = verifyJwt(refreshToken);
  const message = 'Could not refresh access token';
  if (!decoded) {
    throw new APIError({ message, status: 403 });
  }

  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new APIError({ message, status: 403 });
  }

  const accessToken = generateAccessToken(user.toJSON());

  res.status(httpStatus.OK).json({ accessToken });
});

const getProfile = catchAsync(async (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    throw new APIError({ status: httpStatus.UNAUTHORIZED, message: httpStatus['401_MESSAGE'] });
  }
});

module.exports = {
  signUp,
  signIn,
  getProfile,
  refreshAccessToken,
};
