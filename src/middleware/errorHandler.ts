import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/messages';
import { BaseError } from '../exceptions/BaseError';
import { ApiResponse } from '../models/ApiResponse';
import logger from '../config/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseError) {
    const errorResponse = err.serializeErrors();
    logger.error('Application Error', {
      errorCode: errorResponse.errorCode,
      message: errorResponse.message,
      statusCode: errorResponse.statusCode,
      path: req.path,
      method: req.method,
    });

    res.status(errorResponse.statusCode).json(
      ApiResponse.error(
        errorResponse.message,
        errorResponse.errorCode,
        errorResponse.statusCode
      )
    );
    return;
  }

  logger.error('Unexpected Error', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
    ApiResponse.error(
      'Internal server error',
      'INTERNAL_ERROR',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
  );
};
