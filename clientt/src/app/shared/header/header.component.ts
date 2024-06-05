import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAdmin: boolean;

  constructor(private router: Router, private authService: RegisterService) {
    this.isAdmin = this.authService.isAdmin();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
  }
}
