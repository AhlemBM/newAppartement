import { Injectable } from '@angular/core';
import axios from "axios";
import {RegisterService} from "../authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {
  private backendUrl = 'http://localhost:9001/api/v1/reservation';

  constructor(private authService: RegisterService) {
  }

  private static getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }


  async createReservation(reservationData: {
    date_debut: Date;
    nom_client: string;
    nombre_nuits: number;
    commission: number;
    prix_nuit: number;
  }): Promise<any> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const prix_total = reservationData.prix_nuit * reservationData.nombre_nuits;

      const response = await axios.post(
        `${this.backendUrl}/create`,
        {...reservationData, prix_total},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return {success: true, data: response.data};
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      return {success: false, message: error.response?.data?.message || 'Failed to create reservation'};
    }

  }

  async getAllReservations(): Promise<any> {
    const token = ReservationServiceService.getAuthToken();
    if (!token) {
      return {success: false, message: 'No authentication token found'};
    }

    try {
      const response = await axios.get(`${this.backendUrl}/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {success: true, data: response.data};
    } catch (error: any) {
      return {success: false, message: error.response?.data?.message || 'Failed to fetch reservations'};
    }
  }


  async findReservationsByYear (appartement:number, year: number): Promise<any> {
    try {
      const response = await axios.get<any>(`http://localhost:9001/api/v1/reservation/find/year/${appartement}?year=${year}`);
      console.log(response.data)
      return {success: true, data: response.data};
    } catch (error) {
      console.error('Error fetching reservations by year:', error);
      return {success: false};
    }
  }

  async findReservDate (appartement:number): Promise<any> {
    try {
      const response = await axios.get<any>(`http://localhost:9001/api/v1/reservation/find/date/${appartement}`);
      console.log(response.data)
      return {success: true, data: response.data};
    } catch (error) {
      console.error('Error fetching reservations by year:', error);
      return {success: false};
    }
  }




  /*create(data: any) {
    return axios.post<any>( `${this.backendUrl}/create`, data);
  }*/
}
