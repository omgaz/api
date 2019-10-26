const user = require('./user');
const express = require('express');

const app = express();

user(app);

module.exports = app;
