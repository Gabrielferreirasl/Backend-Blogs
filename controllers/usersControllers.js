const usersServices = require('../services/usersServices');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    
    const token = await usersServices.createUser({ displayName, email, password, image });

    if (!token) return res.status(409).json({ message: 'User already registered' });

    res.status(201).json({ token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const token = await usersServices.login({ email, password });

    if (!token) return res.status(400).json({ message: 'Invalid fields' });

    res.status(200).json({ token });
};

const getAllUsers = async (_req, res) => {
    const users = await usersServices.getAllUsers();

    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await usersServices.getUser(+id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    res.status(200).json(user);
};

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUser,
};