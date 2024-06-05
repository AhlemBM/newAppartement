import { Request, Response, NextFunction } from 'express';
import { findUserByEmail, findUserById } from '../../services/user.service';
import { createAppartement, saveAppartement } from '../../services/appartement.service';

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { id } = req.jwtPayload;
  const { name, addresse, frais_menage, email } = req.body;

  try {


    // Rechercher l'utilisateur par email
    const user = await findUserByEmail(email);

    if (!user) {
      return res.customSuccess(500, 'User with the provided email not found', {}, false);
    }

    const newAppartement = await createAppartement({
      name,
      addresse,
      frais_menage,
      user: user // Associer l'ID de l'utilisateur à l'appartement
    });

    await saveAppartement(newAppartement);

    return res.customSuccess(
        200,
        'Appartement successfully created.',
        { appartement: newAppartement },
        true
    );
  } catch (err) {
    console.error(err);
    return res.customSuccess(500, `Appartement can't be created`, {}, false);
  }
};
