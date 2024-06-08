import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from '../../services/reservationService/reservation-service.service';
import {AppartementService} from "../../services/appartementService/appartement.service";

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  apartments: any[] = [];
  selectedApartment: number | null = null;
  reservation: any[] = [];
  barChartData: any[] = [];
  view: [number, number] = [700, 400];
  globalOccupancyRate: number = 0;

  constructor(private reservationService: ReservationServiceService, private appartementService: AppartementService) {}

  ngOnInit() {
    this.loadApartments();
  }

  async loadApartments() {
    try {
      const reponse = await this.appartementService.getAllAppartements();
      this.apartments=reponse.data.data.appartements
    } catch (error) {
      console.error('Error loading apartments:', error);
    }
  }

  async loadReservations() {
    if (this.selectedApartment) {
      try {
        const year = new Date().getFullYear();
        const reponse = await this.reservationService.findReservationsByYear( this.selectedApartment, year);
        this.reservation=reponse.data.data.reservations
        console.log(this.reservation)


        this.prepareChartData();
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    }
  }

  prepareChartData() {
    // Initialiser les données du graphique
    this.barChartData = [];

    // Parcourir les réservations et ajouter les données pour chaque mois au barChartData
    for (let i = 0; i < 12; i++) {
      // Trouver les réservations pour le mois actuel
      const reservationsForMonth = this.reservation.filter(reservation => reservation.month === i + 1);

      // Calculer le total des prix pour ce mois
      const nb_nuit = reservationsForMonth.reduce((total, reservation) => total + reservation.totalNights, 0);
      console.log(nb_nuit)

      // Ajouter les données pour ce mois à barChartData
      this.barChartData.push({
        name: `Month ${i + 1}`,
        value: nb_nuit
      });
    }
  }



}
