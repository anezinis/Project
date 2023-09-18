import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInUser(): boolean {
    return localStorage.getItem('userSession') !== null;
  }

  login(): void {
    localStorage.setItem('userSession', 'true');
  }

  logout(): void {
    localStorage.removeItem('userSession');
    localStorage.removeItem('authToken');
  }
}
