import { Request, Response, NextFunction } from 'express';

import { mailerService } from '../../services/mailer.service';
import { findUserByEmail, saveUser } from '../../services/user.service';
import { generateToken, getTemplate } from '../../utils/common';

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.customSuccess(200, 'Error', {}, false);
    }
    const token = generateToken(5);
    user.token = token.trim();
    await saveUser(user);
    const template = getTemplate(user.token);
    await mailerService(email, 'Code de vérification', template);
    return res.customSuccess(200, 'Email send successfully.', {}, true);
  } catch (err) {
    return res.customSuccess(200, 'Error', {}, false);
  }
};
