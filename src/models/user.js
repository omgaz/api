// TOOD: Use an actual DB
const users = {
  'fake@email.com': {
    email: 'fake@fake.com',
    password: 'password123',
    name: 'Mr Fake',
  },
};

module.exports = {
  async findOne(email) {
    return users[email];
  },

  async create(user) {
    users[user.email] = user;
    return {
      name: user.name,
      email: user.email,
    };
  },
};
