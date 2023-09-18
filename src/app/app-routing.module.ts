import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/views/login/login.component';
import { HomeComponent } from '../app/views/home/home.component';
import { PatientDetailComponent } from './views/patient-detail/patient-detail.component';
import { PatientAddComponent } from './views/patient-add/patient-add.component';
import { PatientDetail2Component } from './views/patient-detail2/patient-detail2.component';
import { AuthGuardComponent } from './Auth/auth-guard/auth-guard.component'; // Import the AuthGuard

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'patient/new/:id',
    component: PatientDetail2Component,
    canActivate: [AuthGuardComponent]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardComponent]
  },
  {
    path: 'patient/:id',
    component: PatientDetailComponent,
    canActivate: [AuthGuardComponent]
  },
  {
    path: 'patient-add',
    component: PatientAddComponent,
    canActivate: [AuthGuardComponent]
  },
  {
    path: '**',
    redirectTo: '/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
