import {Equal, FindOptionsWhere, getRepository} from 'typeorm';

import { AppDataSource } from '../orm/data-source';
import { UserEntity } from '../orm/entities/user.entity';
import {AppartementEntity} from "../orm/entities/appartement.entity";
import {ChekinEntity} from "../orm/entities/checkin.entity";

const userRepository = AppDataSource.getRepository(UserEntity);
const appartementRespository = AppDataSource.getRepository(AppartementEntity);

const checkinRespository = AppDataSource.getRepository(ChekinEntity);
export const createUser = async (input: Partial<UserEntity>) => {
  return await userRepository.save(userRepository.create(input));
};
export const saveUser = async (user: UserEntity) => {
  return await userRepository.save(user);
};
export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({
    email,
  } as FindOptionsWhere<UserEntity>);
};


export const findUserById = async (userId: number, relations = []) => {
  return await userRepository.findOne({
    where: { id: userId },
    relations: relations,
  });
};
export const findUser = async (query: any) => {
  return await userRepository.findOne({
    where: query,

  });
};


export const findUsers = async () => {
  return await userRepository.find({

  });
};

export const countUsers = async (query: any) => {
  return await userRepository.countBy(query as FindOptionsWhere<UserEntity>);
};
export const deleteUser = async (userId) => {


  try {
    // Supprimer les réservations associées à l'utilisateur
    await checkinRespository.delete({ user: { id: userId } });

    // Supprimer les appartements associés à l'utilisateur
    await appartementRespository.delete({ user: { id: userId } });

    // Enfin, supprimer l'utilisateur lui-même
    await userRepository.delete(userId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting user and related entities:", error);
    return { success: false, error: error.message };
  }
};

// Nouvelle méthode pour récupérer les utilisateurs avec leurs appartements
export const findUsersWithApartments = async (userId: number) => {
  console.log(userId)
  return  await userRepository.findOne({
    where: { id: Equal(userId) },
    relations: ['appartements'] });
};

export const countApartmentsWithUsers =async () => {


  const users = await userRepository.find({
    relations: ['appartements'] // Assurez-vous que la relation est correctement définie dans votre entité UserEntity
  });

  return users.map(user => ({
    id: user.id,
    email: user.email,
    nom:user.firstName,
    prenom:user.lastName,
    statut:user.status,
    numberOfApartments: user.appartements.length
  }));
};
