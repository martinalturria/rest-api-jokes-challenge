import { BaseError } from './BaseError';
import { HTTP_STATUS } from '../constants/messages';

export class ExternalApiError extends BaseError {
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  errorCode = 'EXTERNAL_API_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ExternalApiError.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
    };
  }
}
