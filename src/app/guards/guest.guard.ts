import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean> {
        return this.authService.checkIsInSession().pipe(
            map(response => {
                if (response.loggedIn) {
                    // Already logged in → redirect to home
                    this.router.navigate(['/pro-filer/home']);
                    return false;
                } else {
                    // Guest → allow access
                    return true;
                }
            }),
            catchError(() => {
                // If backend is unreachable, allow guest pages
                return of(true);
            })
        );
    }
}
