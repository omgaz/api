const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const decodedUser = req.token.data;
    const user = await UserModel.findOne(decodedUser.email);
    if (!user) {
      res.status(401).end();
    }
    req.currentUser = user;
    return next();
  } catch (e) {
    return res.json(e).status(500);
  }
};
