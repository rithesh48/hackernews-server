const prisma = require('../config/prisma');

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await prisma.comment.create({
      data: { userId: req.user.id, postId, text: req.body.text },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addComment };
