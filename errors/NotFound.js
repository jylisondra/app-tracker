import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPIError.js';

class NotFoundError extends CustomAPIError {
  constructor(msg) {
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
