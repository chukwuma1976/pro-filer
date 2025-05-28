import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../shared/models/user';
import { users } from '../shared/mock-data/resumeData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false; // Track login status
  userInfo!: User; // Store user information

  login(username: string, password: string): Observable<boolean> {
    // Dummy credentials check
    if ((username === 'manofsteel' && password === 'password123')
      || (username === 'darkknight' && password === 'password456')) {
      this.isLoggedIn = true; // Set login status to true
      const foundUser = users.find(user => user.username === username && user.password === password);
      if (!foundUser) {
        throw new Error('User not found');
      }
      this.userInfo = foundUser; // Store user information
      console.log('User info:', this.userInfo); // Log user information
      return of(true);
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  signup(email: string, username: string, password: string): Observable<boolean> {
    // Dummy signup check
    if (username === 'username' || username === 'manofsteel') {
      // Simulate a username that is already taken
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

  logout(): void {
    this.isLoggedIn = false; // Set login status to false
    this.userInfo = undefined!; // Clear user information
    console.log('User logged out'); // Log logout action
  }

}
