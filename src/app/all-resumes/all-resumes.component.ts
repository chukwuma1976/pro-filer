import { Component } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { Resume } from '../shared/models/resume';
import { NgFor, NgIf } from '@angular/common';
import { ResumeDetailsComponent } from "../resume-details/resume-details.component"; // Import NgFor for ngFor directive

@Component({
  selector: 'app-all-resumes',
  imports: [NgFor, NgIf, ResumeDetailsComponent], // Import NgFor for ngFor directive
  templateUrl: './all-resumes.component.html',
  styleUrl: './all-resumes.component.scss'
})
export class AllResumesComponent {
  resumes: Resume[] = []; // Initialize resumes as an empty array

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumes = this.resumeService.getAllResumes(); // Fetch all resumes from the service
  }
}
