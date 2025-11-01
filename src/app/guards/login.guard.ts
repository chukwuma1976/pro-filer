import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("LoginGuard fired for:", state.url);
    return this.authService.checkIsInSession().pipe(
      switchMap(res => {
        console.log("Check session result:", res);
        if (res && res.loggedIn && res.username) {
          return this.userService.getAndCacheByUsername(res.username).pipe(
            map(() => {
              console.log("User info cached, allowing navigation to:", state.url);
              return true;
            })
          );
        } else {
          this.router.navigate(['/login']);
          return of(false);
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
