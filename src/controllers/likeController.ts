const prisma = require('../config/prisma');

const addLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const existingLike = await prisma.like.findUnique({ where: { userId_postId: { userId, postId } } });

    if (existingLike) return res.status(400).json({ message: "Already liked this post" });

    const like = await prisma.like.create({ data: { userId, postId } });
    res.json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await prisma.like.delete({ where: { userId_postId: { userId, postId } } });
    res.json({ message: "Like removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addLike, removeLike };
