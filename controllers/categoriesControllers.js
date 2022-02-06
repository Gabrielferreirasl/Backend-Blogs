const categoriesServices = require('../services/categoriesServices');

const createCategory = async (req, res) => {
    const { name } = req.body;

    const { message, code, id } = await categoriesServices.createCategory(name);

    if (message) return res.status(code).json({ message });

    res.status(201).json({ id, name });
};

module.exports = {
    createCategory,
};