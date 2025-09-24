import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain: string = URL.serverPort + URL.Auth;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(this.domain + '/login', user, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(this.domain + "/logout", {}, { withCredentials: true });
  }

  checkIsInSession(): Observable<{ loggedIn: boolean, username?: string }> {
    return this.http.get<{ loggedIn: boolean, username?: string }>(
      `${this.domain}/check`,
      { withCredentials: true }
    );
  }

  signup(username: string, password: string, email: string): Observable<any> {
    const user = { username, password, email };
    return this.http.post(this.domain + '/register', user, { withCredentials: true });
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
