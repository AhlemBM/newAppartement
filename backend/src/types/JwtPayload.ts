import { Role } from '../orm/entities/types';

export type JwtPayload = {
  id: number;
  role: Role;
  issuer: string;
  provider: string;
};
