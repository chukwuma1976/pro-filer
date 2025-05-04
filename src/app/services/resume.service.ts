import { Injectable } from '@angular/core';
import { users, allResumes } from '../shared/mock-data/resumeData';
import { Resume } from '../shared/models/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor() {
  }

  getResumeData(): Resume {
    return (allResumes ?? [])[0]; // Provide an empty array as fallback if resumes is undefined
  }

  getResumesByUserId(userId: string): Resume[] {
    const user = users.find(user => user.id === userId);
    if (user) {
      return user.resumes ?? []; // Provide an empty array as fallback if resumes is undefined
    } else {
      return []; // Return an empty array if user is not found
    }
  }

  getAllResumes(): Resume[] {
    return allResumes ?? []; // Provide an empty array as fallback if resumes is undefined
  }
}
