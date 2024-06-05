import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: RegisterService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
