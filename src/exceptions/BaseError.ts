export abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract errorCode: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  abstract serializeErrors(): {
    message: string;
    errorCode: string;
    statusCode: number;
  };
}
