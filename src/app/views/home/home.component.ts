import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PatientService } from '../../services/patient-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  patients: any[] = [];
  newPatients: any[] = [];
  isLoading: boolean = true;
  private newPatientSubscription: Subscription;

  private deduplicatePatients(patients: any[]): any[] {
    return patients.filter((patient, index, selfArr) => 
        index === selfArr.findIndex((p) => p.patient_id === patient.patient_id)
    );
}


  readonly API_URL = 'http://62.74.232.210:4566/healthmonitor/patients';

  constructor(private http: HttpClient, private patientService: PatientService, private router: Router ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'API_KEY': '7mJ5Ckgu7duD5lTdLGFRkfcHreY8f6CFQqGlcRVjwHjFWjEdIzBNd3HFlozQAcyHFfxngRoRVquxdaYwL6CLLBFJeu6btl5fbRysWPMfF3GU9wj7ZZUexijWkjPs5uc1'
    });

    const storedPatients = localStorage.getItem('newPatients');
    if (storedPatients) {
      this.newPatients = this.deduplicatePatients(JSON.parse(storedPatients));
  }
  

    this.patientService.newPatientData$.subscribe(data => {
      if (data) {
        this.newPatients.push(data);
        
        localStorage.setItem('newPatients', JSON.stringify(this.newPatients));
      }
    });

    this.http.get<{ patients: any[], numOfTotalPatients: number }>(this.API_URL + '?user_id=18', { headers: headers })
      .subscribe(data => {
        this.patients = data.patients;
        this.isLoading = false;
      }, error => {
        console.error("Error fetching patients", error);
        this.isLoading = false;
      });

    this.newPatientSubscription = this.patientService.newPatientCard$.subscribe(newPatientId => {
      if (newPatientId) {
        this.patientService.getPatientDetail(newPatientId).subscribe(patientDetails => {
          this.newPatients.push(patientDetails);
          localStorage.setItem('newPatients', JSON.stringify(this.newPatients));
        });
      }
    });
  }


  navigateToAddPatient(): void {
    this.router.navigate(['/patient-add']);
  }

  handleLogout(): void {
    localStorage.removeItem('userSession');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
}


  ngOnDestroy(): void {
    if (this.newPatientSubscription) {
      this.newPatientSubscription.unsubscribe();
    }
  }
}