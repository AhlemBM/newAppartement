import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ErrorValidation } from '../../../utils/response/custom-error/types';
export const validatorCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name,addresse,frais_menage } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  name = !name ? '' : name;

  if (validator.isEmpty(name)) {
    errorsValidation.push({ commission: 'name is required' });
  }
  if (validator.isEmpty(addresse)) {
    errorsValidation.push({ commission: 'addresse is required' });
  }
  if (validator.isEmpty(frais_menage)) {
    errorsValidation.push({ commission: 'frais_menage is required' });
  }

  if (errorsValidation.length !== 0) {
    return res.customSuccess(200, 'Validation', { errorsValidation }, false);
  }
  return next();
};
