const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { userValidations, validate } = require('../validations');
const { userControllers } = require('../controllers');

router.post(
  '/signup',
  validate(userValidations.signUp),
  userControllers.signUp,
  /*           
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/SignUpBody" }
  }

      #swagger.responses[201] = {
        schema:{$ref: "#/components/schemas/User"}
  }
  */
);
router.post(
  '/signin',
  validate(userValidations.signIn),
  userControllers.signIn,
  /*           
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/SignInBody" }
  }

      #swagger.responses[200] = {
        schema:{$ref: "#/components/schemas/SignInResponse"}
  }
  */
);
router.post(
  '/refresh',
  userControllers.refreshAccessToken,
  /*           
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/RefreshBody" }
  }

      #swagger.responses[200] = {
        schema:{$ref: "#/components/schemas/RefreshResponse"}
  }

      #swagger.responses[403] = {
        description: 'Could not refresh access token',
        schema:{$ref: "#/components/schemas/Forbidden"}
  }
  */
);
router.get(
  '/profile',
  verifyToken,
  userControllers.getProfile,
  /*           
  #swagger.responses[200] = {
    description: 'User information',
    schema:{$ref: "#/components/schemas/User"}
}
    #swagger.responses[401] = {
      description: 'Unauthorized',
      schema:{$ref: "#/components/schemas/Unauthorized"}
}
  */
);

module.exports = router;
