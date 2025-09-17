import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../services/utility.service';
import { MatIconModule } from '@angular/material/icon';
import { ProfileImageComponent } from "../profile-image/profile-image.component";

@Component({
  selector: 'app-clean-chromatic-template',
  imports: [CommonModule, MatIconModule, ProfileImageComponent],
  templateUrl: './clean-chromatic-template.component.html',
  styleUrl: './clean-chromatic-template.component.scss'
})
export class CleanChromaticTemplateComponent extends DefaultTemplateComponent {

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
