const { BlogPost } = require('../models');
const { Category } = require('../models');

const createPost = async ({ title, content, categoryIds, userId }) => {
    const validation = await Category.findAll({ where: { id: categoryIds }, raw: true });

    if (validation.length !== categoryIds.length) {
        return { message: '"categoryIds" not found', code: 400 };
    }

    const { id } = await BlogPost.create({ title, content, categoryIds, userId });

    return { id };
};

module.exports = {
    createPost,
};