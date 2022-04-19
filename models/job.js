import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    maxlength: 40,
  },
  position: {
    type: String,
    required: true,
    maxlength: 50,
  },
  location: {
    type: String,
    required: true,
    maxlength: 50,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time',
  },
  status: {
    type: String,
    enum: ['pending', 'interviewing', 'rejected'],
    default: 'pending',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  companyURL: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Job', JobSchema);
