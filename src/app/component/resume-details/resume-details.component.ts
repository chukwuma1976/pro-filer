import { Component, Input } from '@angular/core';
import { Resume } from '../../shared/models/resume'; // Import the Resume type
import { NgFor } from '@angular/common';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-resume-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './resume-details.component.html',
  styleUrl: './resume-details.component.scss'
})
export class ResumeDetailsComponent {
  @Input() resumeData: Resume | null = null; // Input property to receive the resume ID

  constructor(private utilityService: UtilityService) { }

  formatDate(date: Date | string | undefined): string {
    return this.utilityService.formatDate(date);
  }
}
