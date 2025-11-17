import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../constants/messages';

export const validateCreateJoke = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { text, userId, categoryId } = req.body;

  if (!text) {
    throw new Error(ERROR_MESSAGES.JOKE.TEXT_REQUIRED);
  }

  if (!userId) {
    throw new Error(ERROR_MESSAGES.JOKE.USER_ID_REQUIRED);
  }

  if (!categoryId) {
    throw new Error(ERROR_MESSAGES.JOKE.CATEGORY_ID_REQUIRED);
  }

  next();
};

export const validateUpdateJoke = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { text } = req.body;

  if (!text) {
    throw new Error(ERROR_MESSAGES.JOKE.TEXT_REQUIRED);
  }

  next();
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = parseInt(req.params.id || req.params.number);

  if (isNaN(id) || id <= 0) {
    throw new Error(ERROR_MESSAGES.VALIDATION.INVALID_ID);
  }

  next();
};

export const validateNumbers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { numbers } = req.query;

  if (!numbers || typeof numbers !== 'string') {
    throw new Error(ERROR_MESSAGES.MATH.EMPTY_ARRAY);
  }

  const numArray = numbers.split(',').map(n => parseInt(n.trim()));

  if (numArray.some(n => isNaN(n) || n <= 0)) {
    throw new Error(ERROR_MESSAGES.MATH.POSITIVE_REQUIRED);
  }

  next();
};

export const validateNumber = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { number } = req.query;

  if (!number || typeof number !== 'string') {
    throw new Error(ERROR_MESSAGES.MATH.INVALID_NUMBER);
  }

  const num = parseInt(number);

  if (isNaN(num)) {
    throw new Error(ERROR_MESSAGES.MATH.INVALID_NUMBER);
  }

  next();
};
