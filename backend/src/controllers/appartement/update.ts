import { Request, Response, NextFunction } from 'express';
import { findCheckinByIdAndUser, saveCheckin } from '../../services/checkin.service';
import { findAppartementById, findAppartementByIdAndUser, saveAppartement } from '../../services/appartement.service';



export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appartementId = req.params.id;
  const { id } = req.jwtPayload;
  const {  Frais_menage } = req.body;


    try {

      const appartement = await findAppartementByIdAndUser(Number(appartementId), id);

      if (!appartement) {
        return res.customSuccess(200, 'appartement not found', {}, false);
      }

      appartement.frais_menage = Frais_menage;

      await saveAppartement(appartement);
      console.log(appartement);

      return res.customSuccess(
        200,
        'appartement successfully updated.',
          { appartement: appartement } ,
        true
      );
    } catch (err) {
      return res.customSuccess(200, `appartement can't be updated`, {}, false);
    }
};
