const { secret } = require('./default.json');

module.exports = {
  secret: process.env.SECRET || secret,
};
