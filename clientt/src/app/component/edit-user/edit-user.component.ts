import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, UserService } from "../../services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import {RegisterService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private  userS:RegisterService) { }
  user: any;
  ngOnInit(): void {
    this.user = this.userS.getUser();
  }

  async updateUserProfile() {
    try {
      const updatedUser = await this.userService.updateUser(this.user.id, this.user);
      console.log("User updated successfully: ", updatedUser);
      // Vous pouvez ajouter ici d'autres actions après la mise à jour réussie
    } catch (error) {
      console.error("Error updating user: ", error);
      // Gérer les erreurs de mise à jour ici
    }
  }

}
