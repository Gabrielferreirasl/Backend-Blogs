const { BlogPost, Category, User } = require('../models');

const createPost = async ({ title, content, categoryIds, userId }) => {
    const validation = await Category.findAll({ where: { id: categoryIds }, raw: true });

    if (validation.length !== categoryIds.length) {
        return { message: '"categoryIds" not found', code: 400 };
    }

    const { id } = await BlogPost.create({ title, content, categoryIds, userId });

    return { id };
};

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return posts;
};

const getPost = async (id) => {
    if (!id || typeof id !== 'number') return null;

    const post = await BlogPost.findByPk(id, {
        include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
};