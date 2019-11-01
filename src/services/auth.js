const argon2 = require('argon2');
const { randomBytes } = require('crypto');
const { secret } = require('../../config');
const UserModel = require('../models/user');

const jwt = require('jsonwebtoken');

module.exports = class AuthService {
  constructor() {}

  async Login(email, password) {
    const userRecord = await UserModel.findOne(email);
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('Incorrect password');
      }
    }

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    };
  }

  async LoginAs(email) {
    const userRecord = await UserModel.findOne({ email });
    console.log('Finding user record...');
    if (!userRecord) {
      throw new Error('User not found');
    }
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    };
  }

  async SignUp(email, password, name, role) {
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      salt: salt.toString('hex'),
      name,
      role: role || 'member',
    });
    const token = this.generateJWT(userRecord);
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token,
    };
  }

  generateJWT(user) {
    return jwt.sign(
      {
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      secret,
      { expiresIn: '6h' },
    );
  }
};
