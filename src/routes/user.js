const AuthService = require('../services/auth');
const checkRole = require('../middlewares/check-role');
const isAuthorised = require('../middlewares/is-authorised');
const attachCurrentUser = require('../middlewares/attach-current-user');
const UserModel = require('../models/user');

const validateRequest = (req, res, next) => {
  if (req.body && req.body.user && req.body.user.email && req.body.user.password) {
    return next();
  }

  return res.status(400).end();
};

module.exports = app => {
  app.get(
    '/user',
    isAuthorised, // are they logged in
    attachCurrentUser, // get the current user so we can check if their role is admin in the next middleware
    checkRole('admin'),
    async (req, res) => {
      const users = await UserModel.all();
      console.log({ users });
      return res
        .status(200)
        .json({ users })
        .end();
    },
  );

  app.post('/user/login', validateRequest, async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.Login(email, password);
      return res
        .status(200)
        .json({ user, token })
        .end();
    } catch (e) {
      return res
        .json(e)
        .status(500)
        .end();
    }
  });

  app.post(
    '/user/login-as',
    isAuthorised,
    attachCurrentUser,
    checkRole('admin'),
    async (req, res) => {
      try {
        const email = req.body.user.email;
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.LoginAs(email);
        return res
          .status(200)
          .json({ user, token })
          .end();
      } catch (e) {
        console.log('Error in login as user: ', e);
        return res
          .json(e)
          .status(500)
          .end();
      }
    },
  );

  app.post('/user/signup', async (req, res) => {
    try {
      const { name, email, password, role } = req.body.user;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.SignUp(
        email,
        password,
        name,
        role,
      );
      return res
        .json({ user, token })
        .status(200)
        .end();
    } catch (e) {
      return res
        .json(e)
        .status(500)
        .end();
    }
  });
};
