import { Component } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../shared/models/resume';
import { NgFor, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResumeDetailsComponent } from "../../component/resume-details/resume-details.component"; // Corrected path to ResumeDetailsComponent

@Component({
  selector: 'app-all-resumes',
  imports: [NgFor, NgIf, ResumeDetailsComponent, MatExpansionModule], // Import NgFor for ngFor directive
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
