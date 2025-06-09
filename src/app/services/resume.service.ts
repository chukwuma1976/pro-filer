import { Injectable } from '@angular/core';
import { users, allResumes } from '../shared/mock-data/resumeData';
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

  getResumeData(): Resume {
    return (allResumes ?? [])[0];
  }

  getResumesByUserId(userId: number | string): Observable<Resume[]> {
    return this.http.get<Resume[]>(this.domain + "/user/" + userId);
    // const user = users.find(user => user.id === userId);
    // if (user) {
    //   return user.resumes ?? []; // Provide an empty array as fallback if resumes is undefined
    // } else {
    //   return []; // Return an empty array if user is not found
    // }
  }

  getResumeById(resumeId: number | string): Observable<Resume> {
    return this.http.get<Resume>(this.domain + '/' + resumeId);
    // return allResumes?.find(resume => resume.id === resumeId); // Provide an empty array as fallback if resumes is undefined
  }


  getAllResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(this.domain);
    // return allResumes ?? []; // Provide an empty array as fallback if resumes is undefined
  }

  addResume(resume: Resume, userId: number | string): Observable<Resume> {
    return this.http.post<Resume>(this.domain + "/" + userId, resume);
    // console.log('adding resume', resume);
  }

  editResume(resume: Resume): Observable<Resume> {
    return this.http.put<Resume>(this.domain + "/" + resume.id, resume);
    // console.log('editing resume', resume);
  }

  deleteResume(resumeId: string): void {
    this.http.delete(this.domain + "/" + resumeId);
    // console.log('deleting resume', resumeId);
  }
}
