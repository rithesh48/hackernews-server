import {prismaClient} from '../extras/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface UserRequest {
  body: {
    name?: string;
    email: string;
    password: string;
  };
}

interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}

export const signUp = async (req: UserRequest, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prismaClient.user.create({
      data: { name: req.body.name ?? 'Anonymous', email: req.body.email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const logIn = async (req: UserRequest, res: Response) => {
  try {
    const user = await prismaClient.user.findUnique({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
