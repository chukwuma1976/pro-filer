import { Injectable } from '@angular/core';
import { Resume } from '../shared/models/resume';
import { HttpClient } from '@angular/common/http';
import { URL } from '../shared/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  domain: string = URL.serverPort + URL.Resume;

  constructor(private http: HttpClient) {
    this.http = http
  }

  getResumesByUserId(userId: number | string): Observable<Resume[]> {
    return this.http.get<Resume[]>(this.domain + "/user/" + userId);
  }

  getResumeById(resumeId: number | string): Observable<Resume> {
    return this.http.get<Resume>(this.domain + '/' + resumeId);
  }


  getAllResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(this.domain);
  }

  addResume(resume: Resume, userId: number | string): Observable<Resume> {
    return this.http.post<Resume>(this.domain + "/" + userId, resume);
  }

  editResume(resume: Resume): Observable<Resume> {
    return this.http.put<Resume>(this.domain + "/" + resume.id, resume);
  }

  deleteResume(resumeId: string): Observable<any> {
    return this.http.delete(this.domain + "/" + resumeId);
  }
}