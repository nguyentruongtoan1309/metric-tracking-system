const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { userValidations, validate } = require('../validations');
const { userControllers } = require('../controllers');

router.post('/signup', validate(userValidations.signUp), userControllers.signUp);
router.post('/signin', validate(userValidations.signIn), userControllers.signIn);
router.post('/refresh', userControllers.refreshAccessToken);
router.get('/profile', verifyToken, userControllers.getProfile);

module.exports = router;
