import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    console.log("LoginGuard fired");
    return this.authService.checkIsInSession().pipe(
      map(res => {
        console.log("Check session result:", res);
        if (res && res.loggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(err => {
        console.error('Guard error:', err);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

}
