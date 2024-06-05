import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from "../../../services/reservationService/reservation-service.service";
import { AppartementService } from "../../../services/appartementService/appartement.service";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  appartements: any[] = [];
 // owners: any[] = []; // Propriétaires
  selectedAppartement: any = null; // Propriétaire sélectionné

  reservation = {
    appartement: '',
    date_debut: new Date(),
    nom_client: '',
    nombre_nuits: 0,
    commission: 0,
    prix_nuit: 0,
    prix_total: 0,
  };

  constructor(
    private reservationService: ReservationServiceService,
    private appartementService: AppartementService
  ) { }

  ngOnInit(): void {
    this.loadAppartements();
  }

  async loadAppartements() {
    const response = await this.appartementService.getAllAppartements();
    if (response.success) {
      this.appartements = response.data.data.appartements;
      console.log("appartement is " + this.appartements)
    } else {
      console.error(response.message);
    }
  }

  calculatePrixTotal() {
    this.reservation.prix_total =
      this.reservation.prix_nuit * this.reservation.nombre_nuits;
  }

  async onSubmit() {

    try {
      // Vérifiez si selectedOwner est null
      if (!this.selectedAppartement) {
        console.error('Selected owner is null');
        return;
      }

      const reservationData = {
        appartement: this.selectedAppartement.name,
        date_debut:this.reservation.date_debut,
        nom_client: this.reservation.nom_client,
        nombre_nuits: this.reservation.nombre_nuits,
        commission:this.reservation.commission,
        prix_nuit: this.reservation.prix_nuit,
        prix_total: this.calculatePrixTotal(),

      };

      const response = await this.reservationService.createReservation(reservationData);
      console.log("la reponses est  "+response.data)
    } catch (error) {
      console.error('Failed to create appartement', error);
    }

  }
}
