import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/authService/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  backendMessage: string = '';
  userData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role:''
  };

  constructor(private registerService: RegisterService, private router: Router) { }
  emailExistsMessage: string = '';
  async checkEmailExists() {
    try {
      const response = await this.registerService.checkEmailExists(this.userData.email);
      if (response.exists) {
        this.emailExistsMessage = 'Email is already in use';
      } else {
        this.emailExistsMessage = '';
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  }


  async register() {
    if (this.emailExistsMessage) {
      return; // Ne pas enregistrer si l'email existe
    }

    try {
      const response = await this.registerService.registerUser(this.userData);
      console.log('User registered successfully', response);
      this.router.navigate(['/proprietaire']);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
}
