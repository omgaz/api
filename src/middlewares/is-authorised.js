const { secret } = require('../../config');

/**
 * Checks that the JWT token received in the http request
 * from the client is valid before allowing access to the API,
 * if the token is invalid a "401 Unauthorized" response is
 * sent to the client.
 */
const getTokenFromHeader = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
};

module.exports = jwt = () => {
  return {
    secret,
    // this is where the next middleware can find the encoded data generated in services/auth:generateJWT
    userProperty: 'token',
    getToken: getTokenFromHeader,
  };
};
