import { Injectable } from '@angular/core';

import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo!: User; // Store user information
  domain: string = URL.serverPort + URL.User
  imgDomain: string = URL.serverPort + URL.Image;

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

  getAndCacheByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.domain + '/username/' + username).pipe(
      tap(user => {
        UserService.userName = username;
        UserService.userId = user.id;
      })
    );
  }

  // Upload or replace profile image
  uploadProfileImage(userId: string | number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.imgDomain}/${userId}/profile-image`, formData, { responseType: 'text' });
  }

  // Get user's profile image
  getProfileImage(userId: string | number): Observable<Blob> {
    return this.http.get(`${this.imgDomain}/${userId}/profile-image`, { responseType: 'blob' });
  }
}
