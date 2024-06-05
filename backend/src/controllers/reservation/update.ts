import { Request, Response, NextFunction } from 'express';
import { findCheckinByIdAndUser, saveCheckin } from '../../services/checkin.service';



export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const CheckId = req.params.id;
  const { id } = req.jwtPayload;
  const { Commission } = req.body as { Commission: number };

    try {
      const checkin = await findCheckinByIdAndUser(Number(CheckId));

      if (!checkin) {
        return res.customSuccess(200, 'reservation not found', {}, false);
      }

      console.log(checkin);
     // checkin.commission = Commission ;


      //await saveCheckin(checkin);
      return res.customSuccess(
        200,
        'reservation successfully updated.',
          { checkin: checkin } ,
        true
      );
    } catch (err) {
      return res.customSuccess(200, `checkin can't be updated`, {}, false);
    }
};
