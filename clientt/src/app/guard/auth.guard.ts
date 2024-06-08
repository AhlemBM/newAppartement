import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {RegisterService} from "../services/authService/auth.service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {  constructor(
  private authService: RegisterService,
  private router: Router
) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {

      return true; // Allow access if the user is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
  }
};
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: RegisterService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.isAdmin();
    if (user ) {
      return true;
    } else {
      this.router.navigate(['/performance']);
      return false;
    }
  }
}
