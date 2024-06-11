import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../../services/user.service';
import {findAppartementById, findAppartements, findAppartementsByUser} from '../../services/appartement.service';


export const findById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
   const id = req.params.id



    try {
        const appartements = await findAppartementById(Number(id));


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

export const findByIdUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.jwtPayload;



    try {
        const appartements = await  findAppartementsByUser (id);


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

