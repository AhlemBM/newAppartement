import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../../services/user.service';
import {findAppartements, findAppartementsByUser} from '../../services/appartement.service';


export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //const { id } = req.jwtPayload;



    try {
        const appartements = await findAppartements();


      return res.customSuccess(
        200,
        'List of appartements.',
        { appartements: appartements },
        true
      );
    } catch (err) {
      return res.customSuccess(200, `appartements not found`, {}, false);
    }

};

