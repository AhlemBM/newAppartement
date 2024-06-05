import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../../services/user.service';
import {findCheckinById, findCheckinByIdAndUser} from '../../services/checkin.service';

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //const id = 5
  const id = req.params.id;


    try {
        const check = await findCheckinByIdAndUser( Number(id));

      return res.customSuccess(
        200,
        'List of checkins.',
        { check: check },
        true
      );
    } catch (err) {
      return res.customSuccess(200, `check not found`, {}, false);
    }

};
