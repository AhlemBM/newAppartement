import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ErrorValidation } from '../../../utils/response/custom-error/types';
export const validatorCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { bookName ,quantity} = req.body;
  const errorsValidation: ErrorValidation[] = [];

  bookName = !bookName ? '' : bookName;

  quantity = !quantity ? '' : quantity;

  if (validator.isEmpty(bookName)) {
    errorsValidation.push({ name: 'Name is required' });
  }

  if (quantity==0) {
    errorsValidation.push({ quatity: 'quatity is required' });
  }

  if (errorsValidation.length !== 0) {
    return res.customSuccess(200, 'Validation', { errorsValidation }, false);
  }
  return next();
};
