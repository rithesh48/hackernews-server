import {prismaClient} from '../extras/prisma';

interface CustomRequest {
  user?: { id: string };
  params: { postId: string };
  body: { text: string };
}

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

export const addComment = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { postId } = req.params;
    const comment = await prismaClient.comment.create({
      data: { userId: req.user.id, postId, text: req.body.text },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
};
