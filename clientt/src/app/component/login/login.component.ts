import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginService.login(this.email, this.password)
      .then(response => {
        if (response.success) {
          const { token, user } = response.data;
          console.log(response);
          console.log('Token:', token);
          console.log('User:', user);
          if (this.loginService.isAdmin()) {
            console.log('Redirecting to homepage...');
            this.router.navigate(['/']); // Rediriger vers le tableau de bord après la connexion
          } else {
            console.log('Redirecting to performance page...');
            this.router.navigate(['/performance']); // Rediriger vers la page de performance
          }
        } else {
          this.errorMessage = response.message;
        }
      })
      .catch(() => {
        this.errorMessage = 'An error occurred. Please try again.';
      });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
