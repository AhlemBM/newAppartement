import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from '../../services/reservationService/reservation-service.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  globalOccupancyRate: number = 0;

  constructor(private reservationService: ReservationServiceService) { }

  ngOnInit(): void {
    this.loadGlobalOccupancyRate();
  }

  loadGlobalOccupancyRate(): void {
    this.reservationService.getAllReservations().then(response => {
      const reservations = response.data.data.checkins;
      const totalReservations = reservations.length;
      const totalApartments = this.getTotalApartments(reservations);
      console.log("total appar"+totalApartments ,"total resrv"+totalReservations)
      this.globalOccupancyRate = (totalReservations / totalApartments) ;
    }).catch(error => {
      console.error('Erreur lors du chargement des réservations:', error);
    });
  }

  getTotalApartments(reservations: any[]): number {
    const apartments = new Set();
    reservations.forEach(reservation => {
      apartments.add(reservation.appartement.name);
    });
    return apartments.size;
  }
}
