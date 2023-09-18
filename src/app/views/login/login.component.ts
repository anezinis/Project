import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;  // Add this line


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const headers = new HttpHeaders({
        'API_KEY': '7mJ5Ckgu7duD5lTdLGFRkfcHreY8f6CFQqGlcRVjwHjFWjEdIzBNd3HFlozQAcyHFfxngRoRVquxdaYwL6CLLBFJeu6btl5fbRysWPMfF3GU9wj7ZZUexijWkjPs5uc1'
      });
  
      this.http.post('http://62.74.232.210:4566/healthmonitor/users/login', { username, password }, { headers })
        .pipe(
          catchError(this.handleError.bind(this))
        )
        .subscribe(response => {
          this.authService.login();
          this.router.navigate(['/home']);
        }, error => {
          this.loginError = error.message || 'User or Pass is invalid. Please try again.';
        });
    }
  }

  private handleError(error: any): any {
    this.loginError = 'Login failed. Please try again.'; 
    return throwError('Login failed. Please try again later.');
  }
}