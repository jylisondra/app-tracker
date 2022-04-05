import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  status: {
    type: String,
    enum: ['pending', 'interview', 'rejected'],
    default: 'pending',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  companyURL: {
    type: String,
  },
  listingURL: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Job', JobSchema);
