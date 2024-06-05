import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor() { }
  private backendUrl = 'http://localhost:9001/api/v1'; // Remplacez par votre URL backend

  async getDashboardData(): Promise<any> {
    try {
      const response = await axios.get(`${this.backendUrl}/user/dashboard`);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch dashboard data' };
    }
  }
}
