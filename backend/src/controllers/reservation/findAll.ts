import { Request, Response, NextFunction } from 'express';

import {
  findCheckinAll, findReservationsWithApartments,

} from '../../services/checkin.service';

export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const checkins = await findReservationsWithApartments();
    console.log(checkins)

    return res.customSuccess(
        200,
        'List of checkins.',
        { checkins: checkins },
        true
    );
  } catch (err) {
    return res.customSuccess(200, `checkins not found`, {}, false);
  }
};
