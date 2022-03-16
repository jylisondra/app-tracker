import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError.js';

class BadRequestError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
