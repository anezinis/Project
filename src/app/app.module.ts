import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './views/home/home.component';
import { PatientDetailComponent } from './views/patient-detail/patient-detail.component';
import { PatientAddComponent } from './views/patient-add/patient-add.component';
import { PatientDetail2Component } from './views/patient-detail2/patient-detail2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardComponent } from '../app/Auth/auth-guard/auth-guard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PatientDetailComponent,
    PatientAddComponent,
    PatientDetail2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgbModule
  ],
  providers: [AuthGuardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
