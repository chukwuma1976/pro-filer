import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { UtilityService } from '../../services/utility.service';
import { ProfileImageComponent } from "../profile-image/profile-image.component";

@Component({
  selector: 'app-visual-professional-template',
  imports: [CommonModule, ProfileImageComponent],
  templateUrl: './visual-professional-template.component.html',
  styleUrl: './visual-professional-template.component.scss'
})

export class VisualProfessionalTemplateComponent extends DefaultTemplateComponent {

  profileImageUrl: any;
  defaultImageUrl = 'assets/images/placeholder_headshot_coming_soon.png';

  constructor(
    protected override utilityService: UtilityService, // inherited from parent
  ) {
    super(utilityService); // pass base class dependency
  }

  override formatDate(date: Date | string | undefined): string {
    return this.utilityService.formatDate(date, true);
  }
}
