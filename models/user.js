import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  location: {
    type: String,
    maxLength: 25,
    trim: true,
  },
});

export default mongoose.model('User', UserSchema);
