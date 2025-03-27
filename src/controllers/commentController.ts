const prisma = require('../config/prisma');

import type { Request, Response } from 'express';

interface CustomRequest extends Request {
  user: { id: string };
}


const addComment = async (req: CustomRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const comment = await prisma.comment.create({
      data: { userId: req.user.id, postId, text: req.body.text },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};

module.exports = { addComment };
