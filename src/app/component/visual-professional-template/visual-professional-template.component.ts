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
}
