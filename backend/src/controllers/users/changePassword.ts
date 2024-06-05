import { Request, Response, NextFunction } from 'express';

import {findUserByEmail, saveUser} from '../../services/user.service';
import {UserEntity} from "../../orm/entities/user.entity";

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.customSuccess(200, 'Error', {}, false);
    }

    user.password = password;
    user.token = null;
    await user.hashPassword();
    await saveUser(user);
    return res.customSuccess(200, 'Password successfully changed.', true);
  } catch (err) {
    return res.customSuccess(200, 'Error', {}, false);
  }
};
