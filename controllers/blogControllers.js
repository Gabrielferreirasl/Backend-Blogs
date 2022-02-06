const blogServices = require('../services/blogServices');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    
    const token = await blogServices.createUser({ displayName, email, password, image });

    if (!token) return res.status(409).json({ message: 'User already registered' });

    res.status(201).json({ token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const token = await blogServices.login({ email, password });

    if (!token) return res.status(400).json({ message: 'Invalid fields' });

    res.status(200).json({ token });
};

const getAllUsers = async (_req, res) => {
    const users = await blogServices.getAllUsers();

    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await blogServices.getUser(+id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    res.status(200).json(user);
};

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUser,
};