import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User, UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  editUserForm: FormGroup;
  userId: number | null = null;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ){
    this.editUserForm = this.fb.group({

      nom: ['', Validators.required],

      // Ajoutez d'autres champs nécessaires
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.userId = +idParam;
      this.userService.getUserById(this.userId).then(
        (data) => {
          this.user = data;
          if (this.user) {
            this.editUserForm.patchValue(this.user);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', error);
        }
      );
    } else {
      console.error('ID utilisateur manquant dans l\'URL');
    }
  }

  onSubmit() {
    if (this.editUserForm.valid && this.userId !== null) {
      this.userService.updateUser(this.userId, this.editUserForm.value).then(
        (data) => {
          console.log('Utilisateur mis à jour avec succès', data);
         // this.router.navigate(['/proprietaire']); // Redirige vers la liste des utilisateurs après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
      );
    }
  }
}
