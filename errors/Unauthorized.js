import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError.js';

class UnauthorizedError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
