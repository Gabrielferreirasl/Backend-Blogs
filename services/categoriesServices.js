const { Category } = require('../models');

const createCategory = async (name) => {
    if (!name || name === '') return { message: '"name" is required', code: 400 };

    const { id } = await Category.create({ name });

    return id;
};

const getAllCategories = async () => {
    const categories = await Category.findAll();

    return categories;
};

module.exports = {
    createCategory,
    getAllCategories,
};