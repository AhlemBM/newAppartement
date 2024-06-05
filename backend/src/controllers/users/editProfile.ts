import { Request, Response, NextFunction } from 'express';

import {
  deleteUser,
  findUserById,
  saveUser,
} from '../../services/user.service';

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const id  = req.params.id;
  try {
    const user = await findUserById(Number(id));


    if (!user) {
      return res.customSuccess(200, 'Error', {}, false);
    }
    if (email) user.email = email;

    await saveUser(user);
    return res.customSuccess(
      200,
      'Profile successfully changed.',
      { user },
      true
    );
  } catch (err) {
    console.log(err);
    return res.customSuccess(200, 'Error', {}, false);
  }
};
export const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.jwtPayload;
  try {
    const user = await findUserById(id, ['sectors']);

    if (!user) {
      return res.customSuccess(200, 'Error', {}, false);
    }

    await deleteUser(user);
    return res.customSuccess(200, 'Profile successfully delete.', {}, true);
  } catch (err) {
    return res.customSuccess(200, 'Error', {}, false);
  }
};
