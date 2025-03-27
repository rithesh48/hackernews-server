import { Request, Response } from 'express';
import User from '../models/User';

interface CustomRequest extends Request {
  user?: { id: string };
}

export const getUserDetails = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ name: 1 }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
