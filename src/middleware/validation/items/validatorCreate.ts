import { Request, Response, NextFunction } from 'express';

import { ConstsItem } from 'consts/ConstsItem';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, duration } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!name) {
    errorsValidation.push({ name: 'name is required' });
  }

  if (!price) {
    errorsValidation.push({ price: 'price is required' });
  }

  if (!duration) {
    errorsValidation.push({ duration: 'duration is required' });
  }

  if (price < ConstsItem.PRICE_MIN_VALUE || price > ConstsItem.PRICE_MAX_VALUE || !Number.isInteger(price)) {
    errorsValidation.push({
      price: `price invalid`,
    });
  }

  if (
    duration < ConstsItem.DURATION_MIN_VALUE ||
    duration > ConstsItem.DURATION_MAX_VALUE ||
    !Number.isInteger(duration)
  ) {
    errorsValidation.push({
      duration: `duration invalid`,
    });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create item validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }
  return next();
};
