import { Component } from '@angular/core';
import { Resume } from '../../shared/models/resume';
import { ResumeService } from '../../services/resume.service';
import { NgFor, NgIf } from '@angular/common';
import { ResumeDetailsComponent } from "../resume-details/resume-details.component";
import { ResumeToolHeaderComponent } from "../resume-tool-header/resume-tool-header.component";

@Component({
  selector: 'app-user-resumes',
  imports: [NgFor, NgIf, ResumeDetailsComponent, ResumeToolHeaderComponent],
  templateUrl: './user-resumes.component.html',
  styleUrl: './user-resumes.component.scss'
})
export class UserResumesComponent {
  resumes: Resume[] = []; // Initialize resumes as an empty array

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumes = this.resumeService.getResumesByUserId('1'); // Fetch all resumes from the service
  }

}
