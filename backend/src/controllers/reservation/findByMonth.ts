import {NextFunction, Request, Response} from "express";
import { findReservationsByYear} from "../../services/checkin.service";
import {Equal} from "typeorm";

export const findByMonth= async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { month, year } = req.query;
const id = req.params.id


    try {
        const reservations = await findReservationsByYear(Number(year), Number(id));

        return res.customSuccess(
            200,
            `Reservations for month ${month} and year ${year}`,
            { reservations: reservations },
            true
        );
    } catch (err) {
        return res.customSuccess(500, 'Error fetching reservations', err.message);
    }
};
