import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-image',
  imports: [],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss'
})
export class ProfileImageComponent {
  @Input() userId: number | string | undefined;
  profileImageUrl: any;
  defaultImageUrl = 'assets/images/placeholder_headshot_coming_soon.png';

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.loadProfileImage();
  }

  loadProfileImage(): void {
    const userId = this.userId;
    if (userId !== undefined && userId !== null) {
      this.userService.getProfileImage(userId).subscribe({
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

}
