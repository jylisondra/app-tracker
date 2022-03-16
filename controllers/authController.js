import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/BadRequest.js';

const register = async (req, res, next) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new BadRequestError('please provide all values');
  }
  const user = await User.create({ firstName, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send('login user');
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
