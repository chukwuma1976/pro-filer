import { Component } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { Resume } from '../shared/models/resume'; // Import the Resume type
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-resume-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './resume-details.component.html',
  styleUrl: './resume-details.component.scss'
})
export class ResumeDetailsComponent {
  resumeData: Resume | null = null; // Initialize resumeData to null

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeData = this.resumeService.getResumeData(); // Fetch the resume data from the service
  }
}
