import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ErrorValidation } from '../../../utils/response/custom-error/types';
export const validatorUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { title } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  title = !title ? '' : title;

  if (validator.isEmpty(title)) {
    errorsValidation.push({ title: 'Name is required' });
  }

  if (errorsValidation.length !== 0) {
    return res.customSuccess(200, 'Validation', { errorsValidation }, false);
  }
  return next();
};
