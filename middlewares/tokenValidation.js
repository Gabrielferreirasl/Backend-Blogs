const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
    jwt.verify(authorization, JWT_SECRET);

    next();
    } catch (_) {
    return res.status(401).json({ message: 'Expired or invalid token' });
    }
};