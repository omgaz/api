// TODO: Persistent storage
const users = {};

module.exports = {
  async findOne(email) {
    return users[email];
  },

  async all() {
    return Object.keys(users).map(key => {
      const user = users[key];
      return {
        email: user.email,
        name: user.name,
        role: user.role,
      };
    });
  },

  async create(user) {
    users[user.email] = user;
    return {
      name: user.name,
      email: user.email,
    };
  },
};
