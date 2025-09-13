import { Component, Input } from '@angular/core';
import { Resume } from '../../shared/models/resume'; // Import the Resume type
import { DefaultTemplateComponent } from "../default-template/default-template.component";
import { ChronologicalTemplateComponent } from '../chronological-template/chronological-template.component';
import { CombinationTemplateComponent } from '../combination-template/combination-template.component';
import { FunctionalTemplateComponent } from '../functional-template/functional-template.component';
import { ModernTemplateComponent } from '../modern-template/modern-template.component';
import { SimpleTemplateComponent } from '../simple-template/simple-template.component';
import { CreativeTemplateComponent } from '../creative-template/creative-template.component';
import { MinimalistTemplateComponent } from '../minimalist-template/minimalist-template.component';
import { ATSFriendlyTemplateComponent } from '../ats-friendly-template/ats-friendly-template.component';
import { UniqueTemplateComponent } from '../unique-template/unique-template.component';
import { VisualProfessionalTemplateComponent } from "../visual-professional-template/visual-professional-template.component";


@Component({
  selector: 'app-resume-details',
  standalone: true,
  imports: [
    DefaultTemplateComponent,
    ChronologicalTemplateComponent,
    CombinationTemplateComponent,
    FunctionalTemplateComponent,
    ModernTemplateComponent,
    SimpleTemplateComponent,
    CreativeTemplateComponent,
    MinimalistTemplateComponent,
    ATSFriendlyTemplateComponent,
    UniqueTemplateComponent,
    VisualProfessionalTemplateComponent
  ],
  templateUrl: './resume-details.component.html',
  styleUrl: './resume-details.component.scss'
})
export class ResumeDetailsComponent {
  @Input() resumeData: Resume | null = null; // Input property to receive the resume ID
}
