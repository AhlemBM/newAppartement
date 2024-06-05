import { Component } from '@angular/core';
import {DashbordService} from "../../services/dashboardService/dashbord.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userCount: number | null = null;
  appartementCount: number | null = null;
  reservationData: { year: number, month: number, count: number }[] = [];
  errorMessage: string | null = null;

  constructor(private dashboardService: DashbordService) {}

  async ngOnInit() {
    const result = await this.dashboardService.getDashboardData();
    if (result.success) {
      this.userCount = result.data.userCount;
      this.appartementCount = result.data.appartementCount;
      this.reservationData = result.data.reservationData;
    } else {
      this.errorMessage = result.message;
    }
  }

  getMonthName(month: number): string {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('default', { month: 'long' });
  }
}
