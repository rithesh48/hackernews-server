import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoutes } from '../src/routes/authRoutes';
import userRoutes from '../src/routes/userRoutes';
import postRoutes from '../src/routes/postRoutes';
import likeRoutes from '../src/routes/likeRoutes';
import commentRoutes from '../src/routes/commentRoutes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);

const PORT: number = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
