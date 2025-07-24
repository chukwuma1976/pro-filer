import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';
import { Education } from '../shared/models/education';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  domain: string = URL.serverPort + URL.Education

  constructor(private http: HttpClient) {
    this.http = http
  }

  addEducationByResumeId(resumeId: number | string, education: Education): Observable<Education> {
    return this.http.post<Education>(`${this.domain}/resume/${resumeId}`, education);
  }

  editEducation(education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.domain}/${education.id}`, education);
  }

  deleteEducation(educationId: string): Observable<any> {
    return this.http.delete(`${this.domain}/${educationId}`);
  }
}
