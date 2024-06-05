import { Request, Response, NextFunction } from 'express';

import { findUserByEmail, saveUser } from '../../services/user.service';

export const securityPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, newPassword, email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user || !user.checkIfPasswordMatch(password)) {
      return res.customSuccess(200, 'Error', {}, false);
    }
    user.password = newPassword;
    await user.hashPassword();
    await saveUser(user);
    return res.customSuccess(200, 'Password successfully changed.', {}, true);
  } catch (err) {
    return res.customSuccess(200, 'Error', {}, false);
  }
};
