import { Request, Response, NextFunction } from 'express';

import { ConstsUser } from 'consts/ConstsUser';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateDeposit = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!amount) {
    errorsValidation.push({ price: 'amount is required' });
  }

  if (amount < ConstsUser.DEPOSIT_MIN_VALUE || amount > ConstsUser.DEPOSIT_MAX_VALUE || !Number.isInteger(amount)) {
    errorsValidation.push({
      amount: `amount invalid`,
    });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'update deposit validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }
  return next();
};
