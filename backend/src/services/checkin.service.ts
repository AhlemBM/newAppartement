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


export const findReservationsByYear = async (year: number, appartementId: number) => {
  try {
    const startDate = new Date(year, 0, 1); // Beginning of the year
    const endDate = new Date(year, 11, 31); // End of the year

    const reservations: ChekinEntity[] = await checkinRespository.find({
      where: {
        //user: Equal(userId),
        appartement: Equal(appartementId),
        date_debut: Between(startDate, endDate),
      },
      relations: ['appartement'],
    });

    // Initialize an object to store aggregated data by month and apartmentId
    const report: { [key: string]: MonthlyReport } = {};

    // Aggregate data by month and apartmentId
    reservations.forEach(reservation => {
      const startDate = new Date(reservation.date_debut);
      const month = startDate.getMonth() + 1; // getMonth() returns 0-11, adding 1 for 1-12
      const apartmentId = reservation.appartement.id;

      const key = `${year}-${month}-${apartmentId}`;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      console.log("**********************************"+daysInMonth)
      if (!report[key]) {
        report[key] = {
          year: year,
          month: month,
          totalNights: 0,
          totalPrice: 0,
          occupation: 0,
          apartmentId: apartmentId,
        };
      }

      report[key].totalNights += reservation.nombre_nuits;

      // Calcul du taux d'occupation
      report[key].occupation += (reservation.nombre_nuits / daysInMonth)*100;
      report[key].totalPrice += reservation.prix_total;
    });



    // Convert the report object to an array
    return Object.values(report);
  } catch (error) {
    console.error('Error fetching reservations by year: ', error);
    throw error;
  }
};




export const findReservationsByYearAndApartment = async (year: number, /*userId: number, */apartmentId: number) => {
  try {
    const startDate = new Date(year, 0, 1); // Début de l'année
    const endDate = new Date(year, 11, 31); // Fin de l'année

    const reservations: ChekinEntity[] = await checkinRespository.find({
      where: {
      //  user: Equal(userId),
        date_debut: Between(startDate, endDate),
        appartement: Equal(apartmentId) // Filtrer par l'ID de l'appartement sélectionné
      },
      relations: ['appartement'],
    });

    // Initialisation du tableau pour stocker les données agrégées par mois
    const report: MonthlyReport[] = [];
    for (let i = 0; i < 12; i++) {
      report.push({
        year: year,
        month: i + 1,
        totalNights: 0,
        totalPrice: 0,
        occupation: 0,
        apartmentId: apartmentId
      });
    }

    // Agrégation des données par mois
    reservations.forEach(reservation => {
      // Convertir la date_debut en objet Date
      const startDate = new Date(reservation.date_debut);
      const month = startDate.getMonth();
      report[month].totalNights += reservation.nombre_nuits; // Assurez-vous que ChekinEntity contient la propriété totalNights
      // Calcul du nombre de jours dans le mois
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      console.log("**********************************"+daysInMonth)
      // Calcul du taux d'occupation
      report[month].occupation += reservation.nombre_nuits / daysInMonth;
      report[month].totalPrice += reservation.prix_total;
    });
    // Calculer le taux d'occupation final
    report.forEach(monthlyReport => {
      monthlyReport.occupation = (monthlyReport.occupation / report.length) * 100; // en pourcentage
    });

    // Retournez le rapport
    return report;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations par année et appartement : ', error);
    throw error;
  }
};

export const findReservedDatesByApartment = async (apartmentId: number) => {
  try {
    const reservations: ChekinEntity[] = await checkinRespository.find({
      where: {
        appartement: Equal(apartmentId)
      }
    });

    // Initialiser un tableau pour stocker toutes les dates réservées
    let reservedDates: Date[] = [];

    // Parcourir chaque réservation pour extraire les dates de début et les dates suivantes
    reservations.forEach(reservation => {
      const startDate = new Date(reservation.date_debut);
      const nights = reservation.nombre_nuits;

      // Ajouter la date de début
      reservedDates.push(startDate);

      // Ajouter les dates suivantes en fonction du nombre de nuits réservées
      for (let i = 1; i < nights; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(startDate.getDate() + i);
        reservedDates.push(nextDate);
      }
    });

    return reservedDates;
  } catch (error) {
    console.error('Erreur lors de la récupération des dates réservées pour l\'appartement : ', error);
    throw error;
  }
};



interface MonthlyReport {
  month: number;
  totalNights: number;
  occupation: number;
  totalPrice: number;
  year:number
  apartmentId: number;
}
