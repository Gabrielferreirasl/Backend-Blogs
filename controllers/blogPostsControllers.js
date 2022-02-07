const blogPostsServices = require('../services/blogPostsServices');

const createPost = async (req, res) => {
    const { title, content, categoryIds, userId } = req.body;

    const { message, code, id } = await blogPostsServices
    .createPost({ title, content, categoryIds, userId });

    if (message) return res.status(code).json({ message });

    res.status(201).json({ id, title, content, categoryIds, userId });
};

const getAllPosts = async (_req, res) => {
    const posts = await blogPostsServices.getAllPosts();

    res.status(200).json(posts);
};

const getPost = async (req, res) => {
    const { id } = req.params;

    const post = await blogPostsServices.getPost(+id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    res.status(200).json(post);
};

const editPost = async (req, res) => {
    const { title, content, userId } = req.body;
    const { id } = req.params;

    const { code, message, post } = await blogPostsServices
    .editPost({ title, content, userId, id: +id });

    if (message) return res.status(code).json({ message });

    res.status(200).json(post);
};

const deletePost = async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;

    const { message, code } = await blogPostsServices.deletePost({ userId, id: +id });

    if (message) return res.status(code).json({ message });

    res.status(204).end();
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    editPost,
    deletePost,
};