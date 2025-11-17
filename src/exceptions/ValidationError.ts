import { BaseError } from './BaseError';
import { HTTP_STATUS } from '../constants/messages';

export class ValidationError extends BaseError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  errorCode = 'VALIDATION_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
    };
  }
}
