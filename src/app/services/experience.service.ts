import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';
import { Experience } from '../shared/models/experience';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  domain: string = URL.serverPort + URL.Experience;

  constructor(private http: HttpClient) {
    this.http = http
  }

  addExperienceByResumeId(resumeId: number | string, experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.domain}/resume/${resumeId}`, experience);
  }

  editExperience(experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.domain}/${experience.id}`, experience);
  }

  deleteExperience(experienceId: string): Observable<any> {
    return this.http.delete(`${this.domain}/${experienceId}`);
  }
}
