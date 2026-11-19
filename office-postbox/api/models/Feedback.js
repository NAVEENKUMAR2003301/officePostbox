import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    category: { type: String, default: 'General' },
    isAnonymous: { type: Boolean, default: false },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);