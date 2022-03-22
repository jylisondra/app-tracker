import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/BadRequest.js';
import UnauthorizedError from '../errors/Unauthorized.js';

const register = async (req, res, next) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new BadRequestError('please provide all values firstname');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError('Email is already registered');
  }
  const user = await User.create({ firstName, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Pleaes provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials');
  }
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
