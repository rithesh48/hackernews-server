import {prismaClient} from '../extras/prisma';
import type { Request, Response } from 'express';

// Extend the Request interface to include the 'user' property
interface CustomRequest extends Request {
  user?: { id: string };
}

export const createPost = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const post = await prismaClient.post.create({
      data: { userId: req.user.id, content: req.body.content },
    });
    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prismaClient.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
