import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ErrorValidation } from '../../../utils/response/custom-error/types';
export const validatorUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {commission } = req.body;

  const errorsValidation: ErrorValidation[] = [];

  commission = !commission ? '' : commission;

  if (validator.isEmpty(commission)) {
    errorsValidation.push({ name: ' commission is required' });
  }

  if (errorsValidation.length !== 0) {
    return res.customSuccess(200, 'Validation', { errorsValidation }, false);
  }
  return next();
};
