import { BaseError } from './BaseError';
import { HTTP_STATUS } from '../constants/messages';

export class DatabaseError extends BaseError {
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  errorCode = 'DATABASE_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
    };
  }
}
