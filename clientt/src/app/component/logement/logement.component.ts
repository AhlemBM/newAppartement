import { Component, OnInit } from '@angular/core';
import { AppartementService } from "../../services/appartementService/appartement.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.css']
})
export class LogementComponent implements OnInit {
  appartements: any[] = [];
  errorMessage: string = '';

  constructor(private router: Router, private appartementService: AppartementService) { }

  ngOnInit(): void {
    this.fetchAppartements();
  }

  fetchAppartements(): void {
    this.appartementService.getAllAppartements()
      .then(response => {
        console.log('Raw response:', response);  // Log to inspect raw response
        if (response.success) {
          this.appartements = response.data.data.appartements;
          console.log("Appartements:", this.appartements);  // Log to verify appartements content
        } else {
          this.errorMessage = response.message;
          console.log("Error message:", this.errorMessage);  // Log to verify error message
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to load appartements. Please try again later.';
      });
  }

  goToAddAppartement(): void {
    this.router.navigate(['/addAppartement']);
  }

  deleteAppartement(appartementId: string): void {
    this.appartementService.deleteAppartement(appartementId)
      .then(response => {
        if (response.success) {
          // Remove the deleted appartement from the list
          this.appartements = this.appartements.filter(appartement => appartement.id !== appartementId);
        } else {
          this.errorMessage = response.message;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to delete appartement. Please try again later.';
      });
  }
  goToDetail(id: number): void {
    this.router.navigate(['/detail-appartement', id]);
  }

}
