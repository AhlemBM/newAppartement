import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {AppartementService} from "../../services/appartementService/appartement.service";
import {ReservationServiceService} from "../../services/reservationService/reservation-service.service";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {


  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef;
   year = new Date().getFullYear();
  apartments: any[] = [];
  selectedApartment: number | null = null;
  reservation: any[] = [];
  barChart: any;
  selectedYear: number = new Date().getFullYear();
  selectedHousing: string = ''; // Assurez-vous d'avoir cette valeur correctement définie


  constructor(private reservationService: ReservationServiceService, private appartementService: AppartementService) {}

  ngOnInit() {
    this.createChart(); // Créer le graphique initial vide
    this.loadApartments();
  }

  async loadApartments() {
    try {
      const response = await this.appartementService.getAllAppartements();
      this.apartments = response.data.data.appartements;
    } catch (error) {
      console.error('Error loading apartments:', error);
    }
  }

  async loadReservations() {
    if (this.selectedApartment) {
      try {
        const response = await this.reservationService.findReservationsByYear(this.selectedApartment, this.year);
        this.reservation = response.data.data.reservations;

        // Une fois les réservations chargées, appelez la méthode pour créer le graphique
        this.createChart();
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    }
  }

  createChart() {
    if (this.barChart) {
      this.barChart.destroy(); // Détruire le graphique précédent s'il existe
    }

    const labels = ['jan.', 'fev.', 'mar.', 'avr.', 'mai.', 'juin.', 'juil.', 'aou.', 'sep.', 'oct.', 'nov.', 'dec.'];
    const data = this.getDataForYearAndHousing();

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Payout versé ${this.selectedYear} - ${this.selectedHousing}`,
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
  getDataForYearAndHousing(): number[] {
    const monthlyPayments: number[] = Array(12).fill(0);

    this.reservation.forEach(reservation => {
      const month = reservation.month - 1; // Mois commence à 1, alors que les index du tableau commencent à 0
      const totalPrice = reservation.totalPrice;
      monthlyPayments[month] += totalPrice;
    });

    return monthlyPayments;
  }
}
