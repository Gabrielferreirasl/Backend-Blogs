const jwt = require('jsonwebtoken');
const argon = require('argon2');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const createUser = async ({ displayName, email, password, image }) => {
    const validateEmail = await User.findOne({ where: { email } });

    if (validateEmail) return null;

    const digest = await argon.hash(password, { type: argon.argon2id });
    const token = jwt.sign({ displayName, email, password, image }, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
      });

    await User.create({ displayName, email, password: digest, image });
    return token;
};

module.exports = {
    createUser,
};