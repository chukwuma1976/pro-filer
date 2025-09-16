import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-visual-professional-template',
  imports: [CommonModule],
  templateUrl: './visual-professional-template.component.html',
  styleUrl: './visual-professional-template.component.scss'
})

export class VisualProfessionalTemplateComponent extends DefaultTemplateComponent {

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
    const userId = this.resumeData?.userId;
    if (userId !== undefined && userId !== null) {
      this.userService.getProfileImage(userId || UserService.userId).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: () => {
          console.warn('No profile image found for user ' + userId);
        }
      });
    } else {
      console.warn('User ID is undefined or null, cannot load profile image.');
    }
  }

  override formatDate(date: Date | string | undefined): string {
    return this.utilityService.formatDate(date, true);
  }
}
