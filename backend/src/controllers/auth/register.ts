import process from 'process';

import { Request, Response, NextFunction } from 'express';

import cloudinary from '../../adapters/cloudinary';
import { Provider, Role } from '../../orm/entities/types';
import {
  countUsers,
  createUser,
  findUserByEmail,
  saveUser,
} from '../../services/user.service';
import { JwtPayload } from '../../types/JwtPayload';
import { createJwtToken } from '../../utils/createJwtToken';

import { UserEntity } from '../../orm/entities/user.entity';

import { AppDataSource } from "../../orm/data-source";


export const checkEmailExists = async (req: Request, res: Response) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const userRepository = AppDataSource.getRepository(UserEntity);
  const user = await userRepository.findOne({ where: { email: String(email) } });

  if (user) {
    return res.status(200).json({ exists: true });
  }

  return res.status(200).json({ exists: false });
};
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user) {
      return res.customSuccess(
        200,
        `email : Email '${user.email}' already exists`,
        {},
        false
      );
    }

    try {
      const newUser = await createUser({
        email: email.toLowerCase(),
        password,
        firstName,
        lastName,
        role
      });

      await saveUser(newUser);

      const jwtPayload: JwtPayload = {
        issuer: '/api/v1/auth/register',
        provider: newUser.provider as Provider,
        id: newUser.id,
        role: newUser.role as Role,
      };
      try {
        const token = createJwtToken(jwtPayload);
        return res.customSuccess(
          200,
          'User successfully created.',
          { token: `${token}`, user: newUser },
          true
        );
      } catch (err) {
        return res.customSuccess(200, "Token can't be created", {}, false);
      }
    } catch (err) {
      return res.customSuccess(
        200,
        `User '${email}' can't be created`,
        {},
        false
      );
    }
  } catch (err) {
    return res.customSuccess(
      200,
      `User '${email}' can't be created`,
      {},
      false
    );
  }
};
