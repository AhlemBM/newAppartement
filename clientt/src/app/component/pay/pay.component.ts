
import {AppartementService} from "../../services/appartementService/appartement.service";

import {Component, ElementRef, ViewChild} from "@angular/core";
import {Chart} from "chart.js";
import {ReservationServiceService} from "../../services/reservationService/reservation-service.service";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {

  @ViewChild('barCanvas') private barCanvas!: ElementRef;
  barChart: any;
  years: number[] = [2022, 2023, 2024];
  year: number = 2024;
  apartments: any[] = [];
  selectedApartment: number=0;
  reservations: any[] = [];

  constructor(
    private appartementService: AppartementService,
    private reservationService: ReservationServiceService
  ) { }

  ngOnInit(): void {
    this.loadApartments();
  }

  ngAfterViewInit(): void {
    this.loadReservations();
  }

  async loadApartments() {
    try {
      const response = await this.appartementService.getAppartementByIdUser();
      this.apartments = response.data.appartements;
    } catch (error) {
      console.error('Error loading apartments:', error);
    }
  }

  async loadReservations() {
    if (this.selectedApartment) {
      try {
        const response = await this.reservationService.findReservationsByYear(this.selectedApartment, this.year);
        this.reservations = response.data.data.reservations;
        this.createChart();
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    }
  }

  getDataForYearAndHousing(): number[] {
    const monthlyPayments: number[] = Array(12).fill(0);
    this.reservations.forEach(reservation => {
      const month = reservation.month - 1;
      const totalPrice = reservation.totalPrice;
      monthlyPayments[month] += totalPrice;
    });
    return monthlyPayments;
  }

  createChart() {
    const data = this.getDataForYearAndHousing();
    if (this.barChart) {
      this.barChart.destroy();
    }
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['jan.', 'fev.', 'mar.', 'avr.', 'mai.', 'juin.', 'juil.', 'aou.', 'sep.', 'oct.', 'nov.', 'dec.'],
        datasets: [{
          label: `Pay-out versé ${this.year}`,
          data: data,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
