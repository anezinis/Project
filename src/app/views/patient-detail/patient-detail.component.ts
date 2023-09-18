import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

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
          this.patient = data[0];
          console.log("Patient", this.patient);
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