import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/BadRequest.js';

const register = async (req, res, next) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new BadRequestError('please provide all values');
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
    location: user.location,
  });
};
const login = async (req, res) => {
  res.send('login user');
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
