import { Request, Response, NextFunction } from 'express';


import { deleteAppartementById, findAppartementByIdAndUser } from '../../services/appartement.service';

export const deleteAppartement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appartementId = req.params.id;
 // const { id } = req.jwtPayload;
    try {
      await deleteAppartementById(appartementId);

      return res.customSuccess(200, 'appartement successfully deleted.', true, true);

  } catch (err) {
    return res.customSuccess(200, `appartement can't be deleted`, {}, false);
  }
};
