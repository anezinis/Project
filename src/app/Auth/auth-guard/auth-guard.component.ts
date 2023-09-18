import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import the AuthService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardComponent implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedInUser()) {
      return true;
    }
  
    // Redirect to login page if not logged in
    this.router.navigate(['/login']);
    return false;
  }
}
