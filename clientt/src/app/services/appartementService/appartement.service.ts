import { Injectable } from '@angular/core';
import axios from "axios";
import { RegisterService } from "../authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AppartementService {
  constructor(private authService: RegisterService) {
  }

  private backendUrl = 'http://localhost:9001/api/v1/appartement';

  async createAppartement(appartementData: {
    name: string;
    addresse: string;
    frais_menage: string;
    email: string
  }): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {success: false, message: 'No authentication token found'};
    }

    try {
      const response = await axios.post(
        `${this.backendUrl}/create`,
        appartementData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return {success: true, data: response.data};
    } catch (error: any) {
      return {success: false, message: error.response?.data?.message || 'Failed to create appartement'};
    }
  }

  async getAllAppartements(): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {success: false, message: 'No authentication token found'};
    }

    try {
      const response = await axios.get(`${this.backendUrl}/getAll`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return {success: true, data: response.data};
    } catch (error: any) {
      return {success: false, message: error.response?.data?.message || 'Failed to fetch appartements'};
    }
  }

  async deleteAppartement(appartementId: string): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {success: false, message: 'No authentication token found'};
    }

    try {
      const response = await axios.delete(
        `${this.backendUrl}/delete/${appartementId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return {success: true, data: response.data};
    } catch (error: any) {
      return {success: false, message: error.response?.data?.message || 'Failed to delete appartement'};
    }
  }


  async getAppartementById(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.backendUrl}/find/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch appartement details');
    }
  }
  async getAppartementByIdUser(): Promise<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {success: false, message: 'No authentication token found'};
    }
    try {
      const response = await axios.get(`${this.backendUrl}/find/`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch appartement details');
    }
  }
}
