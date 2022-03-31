import UnauthorizedError from '../errors/Unauthorized.js';
import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthorizedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1]; // auth: Bearer <token> -- want token

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthorizedError('Authentication Invalid');
  }
};

export default authenticate;
