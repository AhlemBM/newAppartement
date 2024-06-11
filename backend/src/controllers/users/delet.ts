    import { Request, Response, NextFunction } from 'express';
    import {deleteUser} from "../../services/user.service";



    export const deleteUserr = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.params.id;
        // const { id } = req.jwtPayload;
        try {
            await deleteUser(userId)

            return res.customSuccess(200, 'user successfully deleted.', true, true);

        } catch (err) {
            return res.customSuccess(200, `user can't be deleted`, {}, false);
        }
    };
