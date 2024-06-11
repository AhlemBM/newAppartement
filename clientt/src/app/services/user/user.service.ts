import { Injectable } from '@angular/core';
import axios from "axios";
import {RegisterService} from "../authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = 'http://localhost:9001/api/v1/user';

  constructor(private authService: RegisterService) {
  }

  private tokenKey: string = 'authToken';
  private userKey: string = 'authUser';


  getUsers(): Promise<any> {
    const token = this.authService.getAuthToken();
    if (!token) {
      return Promise.reject('No token found');
    }

    return axios.get<any>(`${this.backendUrl}/getALL`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUserById(userId: number): Promise<any> {
    const token = this.authService.getAuthToken();
    if (!token) {
      return Promise.reject('No token found');
    }

    return axios.get<any>(`${this.backendUrl}/get/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {

        return {success: true, data: response.data};
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        return {success: false, error: error.message};
      });
  }

  isLoggedIn(): boolean {
    // Récupérer le jeton d'authentification depuis le stockage local (localStorage)
    const authToken = localStorage.getItem(this.tokenKey);

    // Vérifier si le jeton est présent et valide
    if (authToken) {
      // Vérifier si le jeton est expiré ou non
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration && new Date(tokenExpiration) > new Date()) {
        // Le jeton est présent et non expiré, l'utilisateur est connecté
        console.log("true");
        return true;
      } else {
        // Le jeton est expiré, déconnecter l'utilisateur et renvoyer false
        this.logout();
        console.log("false");
        return false;
      }
    } else {
      // Aucun jeton trouvé, l'utilisateur n'est pas connecté
      console.log("false2");
      return false;
    }
  }

  logout(): void {
    // Remove the token and user from localStorage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  async updateUser(id: number, user: User): Promise<User> {
    const response = await axios.put(`${this.backendUrl}/edit-profile/${id}`, user);
    console.log("date de update est " + response.data)
    return response.data;

  }


  getUserByMonth(id: number, month: number, year: number): Promise<any> {
    const token = this.authService.getAuthToken();
    if (!token) {
      return Promise.reject('No token found');
    }

    return axios.get<any>(`http://localhost:9001/api/v1/reservation/find/month/${id}?&month=${month}&year=${year}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        return {success: true, data: response.data};
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
        return {success: false, error: error.message};
      });
  }

  async getUserReservationsByUserId(userId: number): Promise<any> {
    try {
      const response = await axios.get(`http://localhost:9001/api/v1/reservation/find/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations: ', error);
      throw error;
    }
  }

  async findReservationsByYear (userId: number, year: number): Promise<any> {
    try {
      const response = await axios.get<any>(`http://localhost:9001/api/v1/reservation/find/year/${userId}?year=${year}`);
      console.log(response.data)
      return {success: true, data: response.data};
    } catch (error) {
      console.error('Error fetching reservations by year:', error);
      return {success: false};
    }
  }

  async deleteUser (userId: number): Promise<any> {

     return  await axios.delete<any>(`http://localhost:9001/api/v1/user/delete/${userId}`);

  }




}
export interface Appartement {
  id: number;
  name:string
  addresse: string;
  frais_menage: number;
  // Ajoutez d'autres champs selon vos besoins
}
// Définissez une interface pour représenter un utilisateur

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  language: string;
  provider: string;
  role: string;
  status: number;
  created_at: string;
  updated_at: string;
  appartements: Appartement[];
  numberOfApartments?: number;
  // Ajoutez d'autres champs selon vos besoins
}
export interface Reservation {
  id: number;
  dateDebut: string;
  nombre_nuits: number;
  montant: number;
  // Ajoutez d'autres champs si nécessaire
}

