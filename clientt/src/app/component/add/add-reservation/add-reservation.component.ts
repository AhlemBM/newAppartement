import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from '../../../services/reservationService/reservation-service.service';
import { AppartementService } from '../../../services/appartementService/appartement.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  appartements: any[] = [];
  selectedAppartement: any = null;
  reservation = {
    appartement: '',
    date_debut: new Date(),
    nom_client: '',
    nombre_nuits: 0,
    commission: 0,
    prix_nuit: 0,
    prix_total: 0,
  };
  reservedDates: Date[] = []; // Dates réservées pour l'appartement sélectionné

  constructor(
    private reservationService: ReservationServiceService,
    private appartementService: AppartementService
  ) { }

  ngOnInit(): void {
    this.loadAppartements();
  }

  async loadAppartements() {
    try {
      const response = await this.appartementService.getAllAppartements();
      if (response.success) {
        this.appartements = response.data.data.appartements;
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Failed to load appartements', error);
    }
  }

  async loadReservedDates() {
    if (this.selectedAppartement) {
      try {
        const response = await this.reservationService.findReservDate(this.selectedAppartement.id);
        if (response.success) {
          this.reservedDates = response.data.data.reservations.map((date: string) => new Date(date));
          console.log("Reserved dates: ", this.reservedDates);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Failed to load reserved dates', error);
      }
    }
  }

  calculatePrixTotal() {
    this.reservation.prix_total = this.reservation.prix_nuit * this.reservation.nombre_nuits;
  }

  async onSubmit() {
    try {
      if (!this.selectedAppartement) {
        console.error('Selected appartement is null');
        return;
      }

      const reservationData = {
        appartement: this.selectedAppartement.name,
        date_debut: this.reservation.date_debut,
        nom_client: this.reservation.nom_client,
        nombre_nuits: this.reservation.nombre_nuits,
        commission: this.reservation.commission,
        prix_nuit: this.reservation.prix_nuit,
        prix_total: this.calculatePrixTotal(),
      };

      const response = await this.reservationService.createReservation(reservationData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Failed to create reservation', error);
    }
  }

  isDisabledDate = (date: Date | null): boolean => {
    if (!date) return false;
    return !this.reservedDates.some(reservedDate => reservedDate.toDateString() === date.toDateString());
  }
}
