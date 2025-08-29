import { Component } from '@angular/core';
import { Resume } from '../../shared/models/resume';
import { ResumeService } from '../../services/resume.service';
import { NgFor, NgIf } from '@angular/common';
import { ResumeDetailsComponent } from "../resume-details/resume-details.component";
import { ResumeToolHeaderComponent } from "../resume-tool-header/resume-tool-header.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { UserService } from '../../services/user.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-user-resumes',
  imports: [NgFor, ResumeDetailsComponent, ResumeToolHeaderComponent, MatExpansionModule, MatBadgeModule, MatProgressSpinnerModule],
  templateUrl: './user-resumes.component.html',
  styleUrl: './user-resumes.component.scss'
})
export class UserResumesComponent {
  resumes: Resume[] = []; // Initialize resumes as an empty array
  isLoading = true; // Flag to indicate loading state

  constructor(private resumeService: ResumeService, private util: UtilityService) { }

  ngOnInit() {
    this.resumeService.getResumesByUserId(UserService.userId).subscribe(resumes => {
      this.resumes = resumes.map(resume => this.util.processResume(resume) || resume); // Process each resume
      this.isLoading = false; // Set loading to false after fetching resumes
    }); // Fetch all resumes from the service
  }

  getResumeDocumentId(resumeId: number | string): string {
    return this.util.getResumeDocumentId(resumeId);
  }

}
