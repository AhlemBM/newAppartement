import { Request, Response, NextFunction } from 'express';
import {countApartmentsWithUsers, findUserById, findUsers, findUsersWithApartments} from "../../services/user.service";


export const findAll= async (
    req: Request,
    res: Response,
    next: NextFunction
) => {




    try {
        const users = await countApartmentsWithUsers();


        return res.customSuccess(
            200,
            'List of users.',
            { users: users },
            true
        );
    } catch (err) {
        return res.customSuccess(200, `users not found`, {}, false);
    }

};
export const findById= async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const userId = req.params.id; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête

    try {
        const user = await findUsersWithApartments(Number(userId)); // Utiliser le service pour trouver l'utilisateur par son ID

        if (!user) {
            // Si aucun utilisateur n'est trouvé, renvoyer une réponse appropriée
            return res.status(404).json({ message: 'User not found' });
        }

        // Si l'utilisateur est trouvé, renvoyer l'utilisateur dans la réponse
        return res.status(200).json({ user: user });
    } catch (err) {
        // Gérer les erreurs et renvoyer une réponse appropriée en cas d'erreur
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
