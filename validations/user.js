const yup = require('yup');

const signUp = yup.object({
  body: yup.object({
    username: yup.string().required('username is required!'),
    password: yup.string().required('password is required!'),
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
  }),
});

const signIn = yup.object({
  body: yup.object({
    username: yup.string().required('username is required!'),
    password: yup.string().required('password is required!'),
  }),
});

const refreshAccessToken = yup.object({
  body: yup.object({
    refreshToken: yup.string().required('refreshToken is required!'),
  }),
});

module.exports = {
  signUp,
  signIn,
  refreshAccessToken,
};
