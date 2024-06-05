import {Component, Input, OnInit} from '@angular/core';
import {Reservation, User, UserService} from "../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";

interface MonthlyReport {
  month: number;
  totalNights: number;
  occupation: number;
  totalPrice:number
  year:number
}
@Component({
  selector: 'app-detail-proprietaire',
  templateUrl: './detail-proprietaire.component.html',
  styleUrls: ['./detail-proprietaire.component.css']
})
export class DetailProprietaireComponent implements OnInit{
  userId: any; // Stockez l'ID de l'utilisateur ici
  user: User | null = null;
  reservation: Reservation[] = [];
  detail:any
  reports: MonthlyReport[]=[];
  constructor(private route: ActivatedRoute,
              private userService: UserService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const id = +params['id']; // Assurez-vous que l'ID est converti en nombre
      const year = new Date().getFullYear();// Current year
      console.log(year)
      try {
        await this.getUserById(id);
        await this.getReservationByUser(id);
        const currentYear =2024// new Date().getFullYear();

        await this.getReservationsByYear(id, currentYear);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur : ', error);
      }
    });

  }

  async getUserById(userId: number): Promise<User | null> {
    try {
      const response = await this.userService.getUserById(userId);
      this.user = response.data.user;
      console.log("User is ", this.user);
      return this.user;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur : ', error);
      return null; // Retourne null en cas d'erreur
    }
  }

  async getReservationByUser(userId: number) {
    try {
      const response = await this.userService.getUserReservationsByUserId(userId);
      this.reservation = response.data.check;
      console.log("User is ", this.reservation);
      return this.reservation;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur : ', error);
      return null; // Retourne null en cas d'erreur
    }
  }

  async getReservationsByYear(userId: number, year: number): Promise<void> {
    try {
      const response = await this.userService.findReservationsByYear(userId, year);
      if (response.success) {
        this.reports = response.data.data.reservations;


      } else {
        console.error('Error fetching reservations:', response.error);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }
  getMonthName(month: number): string {
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return months[month - 1];
  }

}
