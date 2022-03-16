import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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

UserScehma.pre('save', async function () {
  const salt = await bcrypt.genSalt(10); // 10 rounds
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', UserSchema);
