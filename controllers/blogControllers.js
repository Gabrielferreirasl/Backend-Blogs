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

module.exports = {
    createUser,
    login,
};