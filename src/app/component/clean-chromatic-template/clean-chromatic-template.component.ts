import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../services/utility.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clean-chromatic-template',
  imports: [CommonModule, MatIconModule],
  templateUrl: './clean-chromatic-template.component.html',
  styleUrl: './clean-chromatic-template.component.scss'
})
export class CleanChromaticTemplateComponent extends DefaultTemplateComponent {

  profileImageUrl: any;
  defaultImageUrl = 'assets/images/placeholder_headshot_coming_soon.png';

  constructor(
    protected override utilityService: UtilityService, // inherited from parent
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    super(utilityService); // pass base class dependency
  }

  ngOnInit(): void {
    this.loadProfileImage();
  }

  loadProfileImage(): void {
    this.userService.getProfileImage(UserService.userId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        console.warn('No profile image found for user ' + UserService.userId);
      }
    });
  }

  override formatDate(date: Date | string | undefined): string {
    return this.utilityService.formatDate(date, true);
  }
}
