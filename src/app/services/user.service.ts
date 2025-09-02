import { Injectable } from '@angular/core';

import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo!: User; // Store user information
  domain: string = URL.serverPort + URL.User

  static userName: string;
  static userId: number | string;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.domain);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.domain + '/username/' + username);
  }

  getUserByUserId(id: string | number): Observable<User> {
    return this.http.get<User>(this.domain + '/id/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.domain + user.id, user);
  }

  deleteUser(id: string | number): Observable<any> {
    return this.http.delete(this.domain + id);
  }

  setUserInfo(username: string) {
    UserService.userName = username;
    this.http.get<User>(this.domain + '/username/' + username).subscribe(user => UserService.userId = user.id);
  }
}
