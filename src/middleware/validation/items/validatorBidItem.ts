import { Request, Response, NextFunction } from 'express';

import { ConstsItem } from 'consts/ConstsItem';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorBidItem = (req: Request, res: Response, next: NextFunction) => {
  const { item_id, price } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!price) {
    errorsValidation.push({ price: 'price is required' });
  }

  if (!item_id) {
    errorsValidation.push({ price: 'item_id is required' });
  }

  if (price < ConstsItem.PRICE_MIN_VALUE || price > ConstsItem.PRICE_MAX_VALUE || !Number.isInteger(price)) {
    errorsValidation.push({
      price: `price invalid`,
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
