import mongoose from 'mongoose';

const InterviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    mexlength: 40,
  },
  position: {
    type: String,
    required: true,
    maxlength: 50,
  },
  interviewDate: {
    type: Date,
    default: Date.now,
  },
  interviewType: {
    type: String,
    enum: ['phone-screen', 'on-site', 'technical', 'behavioral'],
    default: 'phone-screen',
  },
  notes: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Interview', InterviewSchema);
