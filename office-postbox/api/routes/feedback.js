import express from 'express';
import Feedback from '../models/Feedback.js';
import { connectToDatabase } from '../lib/db.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    await connectToDatabase();
    const { content, category, isAnonymous } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const feedback = await Feedback.create({
      content,
      category: category || 'General',
      isAnonymous: !!isAnonymous,
      submittedBy: isAnonymous ? null : req.user.id,
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error('Feedback error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    await connectToDatabase();
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'name email');
    res.json(feedback);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;