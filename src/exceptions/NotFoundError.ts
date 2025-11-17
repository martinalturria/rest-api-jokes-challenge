import { BaseError } from './BaseError';
import { HTTP_STATUS } from '../constants/messages';

export class NotFoundError extends BaseError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  errorCode = 'NOT_FOUND';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
    };
  }
}
