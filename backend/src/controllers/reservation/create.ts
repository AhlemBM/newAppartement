import { Request, Response, NextFunction } from 'express';

import { createCheckin, saveCheckin } from '../../services/checkin.service';
import {
    findAppartementByName,
    findUserByAppartement,

} from '../../services/appartement.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const {  appartementNom, commission, date_debut, nom_client, prix_nuit, nombre_nuits  } = req.body;

  try {
  /*  const currentUser = await findUserById(userId);
    if (!currentUser) {
      return res.customSuccess(404, 'User not found');
    }*/

    const appartement = await findAppartementByName(appartementNom)


      const user =await  appartement.user


    //const user = await findUserByEmail(nom_client);
    const prix_total = prix_nuit * nombre_nuits;

    const newCheckin = await createCheckin({
      appartement:appartement,
    user:user,
   date_debut,
      nom_client,
     nombre_nuits,
      commission,
     prix_nuit,
      prix_total
    });

    await saveCheckin(newCheckin);
      return res.status(200).json({ message: 'Reservation created successfully' });
  } catch (error) {
      // Si une erreur se produit, renvoyer une réponse avec un code de statut HTTP 500
      console.error('Error creating reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
