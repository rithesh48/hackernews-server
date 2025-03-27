import {prismaClient}from '../extras/prisma';

interface CustomRequest {
  user?: { id: string };
}

interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}

export const getUserDetails = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prismaClient.user.findUnique({ where: { id: req.user.id }, select: { password: false } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsers = async (_req: CustomRequest, res: Response) => {
  try {
    const users = await prismaClient.user.findMany({ orderBy: { name: 'asc' }, select: { password: false } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
