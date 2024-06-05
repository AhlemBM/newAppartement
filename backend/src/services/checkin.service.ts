import {Between, Equal, FindOptionsWhere, MoreThanOrEqual} from 'typeorm';

import { AppDataSource } from '../orm/data-source';
import { ChekinEntity } from '../orm/entities/checkin.entity';
import {  LessThanOrEqual } from 'typeorm';


const checkinRespository = AppDataSource.getRepository(ChekinEntity);


export const createCheckin = async (input: Partial<ChekinEntity>) => {
  return await checkinRespository.save(checkinRespository.create(input));
};

export const saveCheckin = async (checkin: ChekinEntity) => {
  return await checkinRespository.save(checkin);
};

export const findCheckinsByUser = async (userId: number, relations = []) => {
  return await checkinRespository.find({
    where: { user: Equal(userId) },
    relations: relations,
  });
};

export const findCheckinByIdAndUser = async (
    // checkId: number,
    userId: number,
    relations = []
) => {
  return await checkinRespository.find({
    where: {  user: Equal(userId) },
    relations: relations,
  });
};

export const deleteCheckinById = async (id) => {
  return await checkinRespository.delete({ id: Equal(id) });
};

export const findCheckinById = async (
    checkId: number,
    userId: number,
    relations = []
) => {
  return await checkinRespository.findOne({
    where: { id: Equal(checkId), user: Equal(userId) },
    relations: relations,
  });
};



export const findCheckinAll = async () => {
  return await checkinRespository.find();
};


export const findReservationsWithApartments = async () => {

  return  await checkinRespository.find({

    relations: ['appartement'] });
};


  export const findReservationsByYear = async (year: number, userId: number) => {
    try {
      const startDate = new Date(year, 0, 1); // Début de l'année
      const endDate = new Date(year, 11, 31); // Fin de l'année

      const reservations: ChekinEntity[] = await checkinRespository.find({
        where: {
          user: Equal(userId),
          date_debut: Between(startDate, endDate),
        },
        relations: ['appartement'],
      });

      // Initialisation du tableau pour stocker les données agrégées par mois
      const report: MonthlyReport[] = [];
      for (let i = 0; i < 12; i++) {
        report.push({
          year:year,
          month: i + 1,
          totalNights: 0,
          totalPrice: 0,
          occupation: 0

        });
      }

      // Agrégation des données par mois
      reservations.forEach(reservation => {
        // Convertir la date_debut en objet Date
        const startDate = new Date(reservation.date_debut);
        const month = startDate.getMonth();
        report[month].totalNights += reservation.nombre_nuits; // Assurez-vous que ChekinEntity contient la propriété totalNights
        report[month].occupation++;

        report[month ].totalPrice += reservation.prix_total;
      });

      // Retournez le rapport
      return report;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations par année : ', error);
      throw error;
    }
  };

interface MonthlyReport {
  month: number;
  totalNights: number;
  occupation: number;
  totalPrice: number;
  year:number
}
