import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.get('/', (req, res) => {
  res.json({ 
    status: 'Office Postbox API is running!',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      feedback: '/api/feedback'
    }
  });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;