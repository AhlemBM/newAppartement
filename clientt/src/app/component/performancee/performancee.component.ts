import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { AppartementService } from '../../services/appartementService/appartement.service';
import { ReservationServiceService } from '../../services/reservationService/reservation-service.service';

@Component({
  selector: 'app-performancee',
  templateUrl: './performancee.component.html',
  styleUrls: ['./performancee.component.css']
})
export class PerformanceeComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef;
  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas!: ElementRef;
  year = new Date().getFullYear();
  apartments: any[] = [];
  selectedApartment: number | null = null;
  reservations: any[] = [];
  barChart: any;
  doughnutChart: any;
  totalPrixAppartement: number = 0;
  occupation: number = 0;
  selectedYear: number = new Date().getFullYear();
  selectedHousing: string = '';

  constructor(private reservationService: ReservationServiceService, private appartementService: AppartementService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadApartments();
  }

  ngAfterViewInit(): void {
    this.createCharts();
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

        // Calculer le prix total et le taux d'occupation
        this.totalPrixAppartement = this.calculateTotalPrice();
        this.occupation = this.calculateOccupationRate();

        // Mettre à jour les graphiques avec les nouvelles données
        this.updateCharts();
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    }
  }

  createCharts() {
    this.createLineChart();
    this.createDoughnutChart();
  }

  createLineChart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',  // Graphique linéaire
      data: {
        labels: ['jan.', 'fev.', 'mar.', 'avr.', 'mai.', 'juin.', 'juil.', 'aou.', 'sep.', 'oct.', 'nov.', 'dec.'],
        datasets: [{
          label: `Prix des réservations ${this.selectedYear} - ${this.selectedHousing}`,
          data: [],  // Données initialement vides
          backgroundColor: 'rgba(0, 123, 255, 0.2)',  // Couleur de fond plus légère
          borderColor: 'rgba(0, 123, 255, 1)',  // Couleur de la ligne
          borderWidth: 2,
          fill: false  // Désactive le remplissage sous la ligne
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

  createDoughnutChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',  // Graphique circulaire
      data: {
        labels: ['Occupé', 'Libre'],
        datasets: [{
          label: 'Taux d\'occupation',
          data: [0, 100],  // Données initiales avec 0% d'occupation
          backgroundColor: ['rgba(0, 123, 255, 0.5)', 'rgba(220, 220, 220, 0.5)'],
          borderColor: ['rgba(0, 123, 255, 1)', 'rgba(220, 220, 220, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  updateCharts() {
    if (this.barChart) {
      this.barChart.data.datasets[0].data = this.getDataForYearAndHousing();
      this.barChart.update();
    }
    if (this.doughnutChart) {
      this.doughnutChart.data.datasets[0].data = [this.occupation, 100 - this.occupation];
      this.doughnutChart.update();
    }
  }

  getDataForYearAndHousing(): number[] {
    const monthlyPayments: number[] = Array(12).fill(0);

    this.reservations.forEach(reservation => {
      const month = reservation.month - 1; // Mois commence à 1, alors que les index du tableau commencent à 0
      const totalPrice = reservation.totalPrice;
      monthlyPayments[month] += totalPrice;
    });

    return monthlyPayments;
  }

  calculateTotalPrice(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.totalPrice, 0);
  }

  calculateOccupationRate(): number {
    const totalNights = this.reservations.reduce((total, reservation) => total + reservation.totalNights, 0);
    const totalDays = 365; // Assumes a non-leap year
    return (totalNights / totalDays) * 100;
  }
}
