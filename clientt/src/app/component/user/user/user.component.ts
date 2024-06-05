  import {Component, Input} from '@angular/core';
  import {Router} from "@angular/router";
  import {User, UserService} from "../../../services/user/user.service";

  @Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
  })
  export class UserComponent {
    users: User[] = [];
    errorMessage: string = '';

    constructor(
      private userService: UserService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.fetchUsers();
    }

    fetchUsers(): void {
      this.userService.getUsers()
        .then(response => {
          console.log(response)
          if (response.data.status) {
            console.log("users ")
            this.users = response.data.data.users;
          } else {
            this.errorMessage = 'Erreur lors de la récupération des utilisateurs.';
          }
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        });
    }

    goToAddUser(): void {
      this.router.navigate(['register']);
    }




    // Fonction pour afficher les détails de l'utilisateur
    selectedUser: any;
    showUserDetails(user: User): void {
      // Passer les données de l'utilisateur sélectionné au composant de détail
   //   this.selectedUser = user;

      const id = user.id
      this.router.navigate(['detail', id]);
    }

    editUser(user: any): void {
      this.router.navigate(['/edit-user', user.id]);
    }

  }
