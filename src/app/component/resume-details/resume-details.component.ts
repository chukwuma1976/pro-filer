import { Component, Input } from '@angular/core';
import { Resume } from '../../shared/models/resume'; // Import the Resume type
import { DefaultTemplateComponent } from "../default-template/default-template.component";
import { ChronologicalTemplateComponent } from '../chronological-template/chronological-template.component';
import { CombinationTemplateComponent } from '../combination-template/combination-template.component';

@Component({
  selector: 'app-resume-details',
  standalone: true,
  imports: [DefaultTemplateComponent, ChronologicalTemplateComponent, CombinationTemplateComponent],
  templateUrl: './resume-details.component.html',
  styleUrl: './resume-details.component.scss'
})
export class ResumeDetailsComponent {
  @Input() resumeData: Resume | null = null; // Input property to receive the resume ID
}
