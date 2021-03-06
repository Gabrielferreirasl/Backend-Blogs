const jwt = require('jsonwebtoken');
// const argon = require('argon2');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const createUser = async ({ displayName, email, password, image }) => {
    const validateEmail = await User.findOne({ where: { email } });

    if (validateEmail) return null;

    const { id } = await User.create({ displayName, email, password, image });

    // const digest = await argon.hash(password, { type: argon.argon2id });
    const token = jwt.sign({ id, email, password }, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
      });

    return token;
};

const login = async ({ email, password }) => {
    // const validateEmail = await User.findOne({ where: { email } });
    // if (!validateEmail || !argon.verify(validateEmail.password, password)) return null;
    // teste falha usando hash

    const validateEmail = await User.findOne({ where: { email, password }, raw: true });

    if (!validateEmail) return null;

    const token = jwt.sign({ email, password, id: validateEmail.id }, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
      });

      return token;
};

const getAllUsers = async () => {
    const users = await User.findAll();

    return users;
};

const getUser = async (id) => {
    const users = await User.findByPk(id);

    return users;
};

const deleteUser = async (userId) => {
    await User.destroy(
        { where: { id: userId } },
    );
};

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUser,
    deleteUser,
};