const blogPostsServices = require('../services/blogPostsServices');

const createPost = async (req, res) => {
    const { title, content, categoryIds, userId } = req.body;

    const { message, code, id } = await blogPostsServices
    .createPost({ title, content, categoryIds, userId });

    if (message) return res.status(code).json({ message });

    res.status(201).json({ id, title, content, categoryIds, userId });
};

module.exports = {
    createPost,
};