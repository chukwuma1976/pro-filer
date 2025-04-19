import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): Observable<boolean> {
    // Dummy credentials check
    if (username === 'username' && password === 'password') {
      return of(true);
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  signup(fullName: string, username: string, password: string): Observable<boolean> {
    // Dummy signup check
    if (username === 'username') {
      return throwError(() => new Error('Username is already taken'));
    }
    return of(true); // Simulate successful signup
  }

  resetPassword(email: string): Observable<boolean> {
    // Implement the logic to send a password reset email
    // For example, make an HTTP request to your backend API
    // return this.http.post('/api/reset-password', { email }).pipe(
    //   map(() => true),
    //   catchError(() => throwError(() => new Error('Reset password failed')))
    // );
    return of(true); // Simulate successful password reset
  }

}
