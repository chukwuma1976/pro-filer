import { Component } from '@angular/core';
import { Resume } from '../../shared/models/resume';
import { ResumeService } from '../../services/resume.service';
import { NgFor, NgIf } from '@angular/common';
import { ResumeDetailsComponent } from "../resume-details/resume-details.component";
import { ResumeToolHeaderComponent } from "../resume-tool-header/resume-tool-header.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-resumes',
  imports: [NgFor, NgIf, ResumeDetailsComponent, ResumeToolHeaderComponent, MatExpansionModule],
  templateUrl: './user-resumes.component.html',
  styleUrl: './user-resumes.component.scss'
})
export class UserResumesComponent {
  resumes: Resume[] = []; // Initialize resumes as an empty array

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.getResumesByUserId(UserService.userId).subscribe(resumes => this.resumes = resumes); // Fetch all resumes from the service
  }

}
