import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient-service.service';

@Component({
  selector: 'app-patient-detail2',
  templateUrl: './patient-detail2.component.html',
  styleUrls: ['./patient-detail2.component.css']
})
export class PatientDetail2Component implements OnInit {

  patient: any;
  isLoading: boolean = true;
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    const patientId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(patientId)) {
      this.error = 'Invalid patient ID provided.';
      this.isLoading = false;
      return;
    }

    this.fetchPatientDetails(patientId);
  }

  fetchPatientDetails(patientId: number): void {
    this.patientService.getPatientDetail(patientId)
      .subscribe(
        data => {        
          if (Array.isArray(data) && data.length) {
            this.patient = data[0];
          } else {
            this.patient = data;
          }
          this.isLoading = false;
        },
        error => {
          this.error = `Failed to fetch patient details: ${error.message}`;
          this.isLoading = false;
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/home']); 
  }
}