import { Injectable } from '@angular/core';
import { mockUserData } from '../shared/mock-data/resumeData';
import { Resume } from '../shared/models/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor() {
  }

  getResumeData(): Resume {
    return (mockUserData.resumes ?? [])[0]; // Provide an empty array as fallback if resumes is undefined
  }
}
