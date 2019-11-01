module.exports = requiredRole => {
  return (req, res, next) => {
    console.log('Checking currentUser role.');
    if (!req.currentUser) {
      console.error('No currentUser attached to request');
      return res.status(400).end();
    } else if (req.currentUser.role !== requiredRole) {
      return res.status(401).end();
    } else {
      console.log('currentUser met role requirement.');
      return next();
    }
  };
};
