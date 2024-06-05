import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ReservationServiceService } from '../../services/reservationService/reservation-service.service';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

interface Reservation {
  appartement: { name: string };
  date_debut: string;
  nom_client: string;
  nombre_nuits: number;
  commission: number;
  prix_total: number;
  status: number;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage: string = '';
  dataSource = new MatTableDataSource<Reservation>(this.reservations);
  displayedColumns: string[] = ['appartement', 'date_debut', 'nom_client', 'nombre_nuits', 'commission', 'prix_total', 'status'];


  filterLogement: string = '';
  filterYear: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private reservationService: ReservationServiceService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.reservationService.getAllReservations()
      .then(response => {
        if (response.success) {
          this.reservations = response.data.data.checkins;
          this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
          this.dataSource.paginator = this.paginator as MatPaginator; // Assertion de type
          this.dataSource.sort = this.sort;
        } else {
          this.errorMessage = response.message;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to load reservations. Please try again later.';
      });
  }
  applyFilter(): void {
    // Définition des filtres
    const filterValue = this.filterLogement.trim().toLowerCase();
    const filterYearValue = this.filterYear;

    // Application du filtre personnalisé
    this.dataSource.filterPredicate = (data: Reservation, filter: string) => {
      const { logement, year } = JSON.parse(filter);

      // Filtrer par logement
      const logementFilter = !logement || data.appartement.name.toLowerCase().includes(logement);

      // Filtrer par année
      const yearFilter = !year || new Date(data.date_debut).getFullYear() === year;

      return logementFilter && yearFilter;
    };

    // Application des filtres
    this.dataSource.filter = JSON.stringify({ logement: filterValue, year: filterYearValue });

    // Réinitialiser le paginator après chaque changement de filtre
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  goToAddReservation(): void {
    this.router.navigate(['/addreservation']);
  }
}
