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

  getResumeById(resumeId: string): Resume | undefined {
    return allResumes?.find(resume => resume.id === resumeId); // Provide an empty array as fallback if resumes is undefined
  }


  getAllResumes(): Resume[] {
    return allResumes ?? []; // Provide an empty array as fallback if resumes is undefined
  }

  addResume(resume: Resume): void {
    console.log('adding resume', resume);
  }

  editResume(resume: Resume): void {
    console.log('editing resume', resume);
  }

  deleteResume(resumeId: string): void {
    console.log('deleting resume', resumeId);
  }
}
