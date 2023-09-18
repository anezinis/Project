import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface Patient {
  patient_id: any;
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

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiBaseUrl = 'http://62.74.232.210:4566/healthmonitor/patients'; 

  private headers = new HttpHeaders({
    'API_KEY': '7mJ5Ckgu7duD5lTdLGFRkfcHreY8f6CFQqGlcRVjwHjFWjEdIzBNd3HFlozQAcyHFfxngRoRVquxdaYwL6CLLBFJeu6btl5fbRysWPMfF3GU9wj7ZZUexijWkjPs5uc1',
    'Content-Type': 'application/json'
  });

  private newPatientCardSource = new BehaviorSubject<any>(null);
  newPatientCard$ = this.newPatientCardSource.asObservable();

  private patientIdSource = new BehaviorSubject<number | null>(null);  // Added patientIdSource
  newPatientId$ = this.patientIdSource.asObservable();
  currentPatientId = this.patientIdSource.asObservable();
  private _newPatientData = new BehaviorSubject<Patient>(null);
  newPatientData$ = this._newPatientData.asObservable();

  constructor(private http: HttpClient) { }

  getPatientDetail(patientId: number): Observable<any> {
    const url = `${this.apiBaseUrl}?patient_id=${patientId}&details=true`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        catchError(this.handleError<any>(`getPatientDetail id=${patientId}`))
      );
  }

  addNewPatientData(patientData: Patient): void {
    this._newPatientData.next(patientData);
  }

  addNewPatientId(patientId: number): void {
    this.patientIdSource.next(patientId);
  }

  setPatientId(patientId: number): void {
    this.patientIdSource.next(patientId);
  }

  createPatient(data: any): Observable<any> {
    const adjustedData = {
      ...data,
      amka: data.ssn,
      ext_patient: true
    };
    delete adjustedData.ssn;

    return this.http.post<any>(this.apiBaseUrl, adjustedData, { headers: this.headers })
      .pipe(
        catchError(this.handleError<any>('createPatient'))
      );
  }

  addNewPatientCard(data: any): void {
    this.newPatientCardSource.next(data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
