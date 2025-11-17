import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/messages';
import logger from '../config/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error:', { message: err.message, stack: err.stack });

  const statusCode = determineStatusCode(err.message);

  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
    },
  });
};

const determineStatusCode = (message: string): number => {
  if (message.includes('not found') || message.includes('Not found')) {
    return HTTP_STATUS.NOT_FOUND;
  }

  if (
    message.includes('required') ||
    message.includes('invalid') ||
    message.includes('Invalid')
  ) {
    return HTTP_STATUS.BAD_REQUEST;
  }

  return HTTP_STATUS.INTERNAL_SERVER_ERROR;
};
