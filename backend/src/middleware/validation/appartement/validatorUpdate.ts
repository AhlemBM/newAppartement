import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ErrorValidation } from '../../../utils/response/custom-error/types';
import {findAppartementByIdAndUser} from "../../../services/appartement.service";
export const validatorUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {frais_menage } = req.body;


  const errorsValidation: ErrorValidation[] = [];

  frais_menage = !frais_menage ? '' : frais_menage;

  if (validator.isEmpty(frais_menage)) {
    errorsValidation.push({ name: ' frais is required' });
  }

  if (errorsValidation.length !== 0) {
    return res.customSuccess(200, 'Validation', { errorsValidation }, false);
  }
  return next();
};
