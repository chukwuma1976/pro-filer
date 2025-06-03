import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../shared/models/user';
import { users } from '../shared/mock-data/resumeData';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false; // Track login status
  userInfo!: User; // Store user information
  domain: string = URL.serverPort + URL.Auth;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  login(username: string, password: string): Observable<string> {
    const user = { username, password };
    return this.http.post(this.domain + '/login', user, { responseType: 'text' });
  }

  signup(username: string, password: string, email: string): Observable<string> {
    const user = { username, password, email };
    return this.http.post(this.domain + '/register', user, { responseType: 'text' });
  }

  checkIsInSession(): Observable<string> {
    console.log('checked called')
    return this.http.get(this.domain + "/check", { responseType: 'text' })
  }

  setIsLoggedIn() {
    this.isLoggedIn = true;
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
    this.http.get(this.domain + "/logout", { responseType: 'text' });
    this.isLoggedIn = false;
  }

}
