import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false; // Track login status
  domain: string = URL.serverPort + URL.Auth;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  login(username: string, password: string): Observable<string> {
    const user = { username, password };
    return this.http.post(this.domain + '/login', user, { responseType: 'text', withCredentials: true });
  }

  signup(username: string, password: string, email: string): Observable<string> {
    const user = { username, password, email };
    return this.http.post(this.domain + '/register', user, { responseType: 'text' });
  }

  checkIsInSession(): Observable<string> {
    return this.http.get(this.domain + "/check", { responseType: 'text', withCredentials: true })
  }

  setIsLoggedIn() {
    this.isLoggedIn = true;
  }

  setIsLoggedOut() {
    this.isLoggedIn = false;
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

  logout(): Observable<string> {
    return this.http.post(this.domain + "/logout", {}, { responseType: 'text', withCredentials: true });
  }

}
