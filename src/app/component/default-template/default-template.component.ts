import { Component, Input } from '@angular/core';
import { Resume } from '../../shared/models/resume'; // Import the Resume type
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-default-template',
  imports: [CommonModule],
  templateUrl: './default-template.component.html',
  styleUrl: './default-template.component.scss'
})
export class DefaultTemplateComponent {
  @Input() resumeData: Resume | null = null; // Input property to receive the resume ID

  constructor(private utilityService: UtilityService) { }

  formatDate(date: Date | string | undefined): string {
    return this.utilityService.formatDate(date);
  }
}
