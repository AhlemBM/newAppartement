  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import {HomeComponent} from "./component/home/home.component";
  import {LoginComponent} from "./component/login/login.component";
  import {DefaultComponent} from "./default/default/default.component";
  import {RegisterComponent} from "./component/register/register.component";

  import {AppartementComponent} from "./component/add/appartement/appartement.component";
  import {AuthGuard, RoleGuard} from "./guard/auth.guard";
  import {LogementComponent} from "./component/logement/logement.component";
  import {UserComponent} from "./component/user/user/user.component";
  import {ProfileComponent} from "./component/profile/profile.component";
  import {DetailProprietaireComponent} from "./component/detail-proprietaire/detail-proprietaire.component";
  import {EditUserComponent} from "./component/edit-user/edit-user.component";
  import {PerformanceComponent} from "./component/performance/performance.component";
  import {FactureComponent} from "./component/facture/facture.component";
  import {CalenderComponent} from "./component/calender/calender.component";

  import {ReservationComponent} from "./component/reservation/reservation.component";
  import {AddReservationComponent} from "./component/add/add-reservation/add-reservation.component";
  import {DetailAppartementComponent} from "./component/detail-appartement/detail-appartement.component";
  import {PayOutComponent} from "./component/pay-out/pay-out.component";
  import {PayComponent} from "./component/pay/pay.component";
  import {PerformanceeComponent} from "./component/performancee/performancee.component";

  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: '',
      component: DefaultComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: HomeComponent , canActivate: [RoleGuard]  },
        { path: 'addAppartement', component: AppartementComponent },
        { path: 'liste-appartement', component: LogementComponent },
        { path: 'proprietaire', component: UserComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'detail/:id', component: DetailProprietaireComponent },
        { path: 'performance', component: PerformanceeComponent },
        { path: 'facturation', component: FactureComponent },
        { path: 'calendrier', component: CalenderComponent },
        { path: 'pay', component: PayComponent },
        { path: 'addreservation', component: AddReservationComponent },
        { path: 'reservation', component: ReservationComponent },
        { path: 'detail-appartement/:id', component: DetailAppartementComponent },

      ]
    },
 { path: '**', redirectTo: '/login' },  // Redirect any unknown paths to login
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
