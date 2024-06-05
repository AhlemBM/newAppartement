import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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
