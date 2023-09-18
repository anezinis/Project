import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient-service.service';
import { Router } from '@angular/router';

interface Patient {
  firstname: string;
  lastname: string;
  email: string;
  facility_name: string;
  address_street: string;
  address_number: string;
  address_city: string;
  address_postalcode: string;
  birth_date: string;
  sex: string;
  ssn: string;
  phone: string;
}

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facility_name: ['', Validators.required],
      address_street: ['', Validators.required],
      address_number: ['', Validators.required],
      address_city: ['', Validators.required],
      address_postalcode: ['', Validators.required],
      birth_date: ['', Validators.required],
      sex: ['', Validators.required],
      ssn: ['', Validators.required],
      phone: ['']
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formData: Patient = this.patientForm.value;
      const patientData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        facility_id: 1,
        address_street: formData.address_street,
        address_number: formData.address_number,
        address_city: formData.address_city,
        address_postalcode: formData.address_postalcode,
        phonenumber: formData.phone,
        sex: formData.sex,
        age: new Date().getFullYear() - new Date(formData.birth_date).getFullYear(), // Calculate age based on birth_date
        amka: formData.ssn,
        ext_patient: true
      };

      this.patientService.createPatient(patientData).subscribe(response => {
        this.patientService.addNewPatientData(response);
        
        this.router.navigate(['/home']);
      }, error => {
        console.error('Failed to create patient:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goToPatientsList() {
    this.router.navigate(['/home']);
}
}
