const prisma = require('../config/prisma');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: { userId: req.user.id, content: req.body.content },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
