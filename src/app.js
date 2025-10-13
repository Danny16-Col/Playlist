import express from 'express';
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/auth',authRoutes);
app.use('/playlist', playlistRoutes);

app.use(errorHandler);

export default app;