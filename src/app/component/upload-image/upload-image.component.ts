import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload-image',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {
  selectedFile?: File;
  profileImageUrl?: SafeUrl;

  // Example: fixed userId (you can fetch from login/session)
  userId: string | number;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.userId = UserService.userId;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.userService.uploadProfileImage(this.userId, this.selectedFile).subscribe({
        next: (res) => {
          alert(res);
          this.loadProfileImage();
        },
        error: (err) => alert("Upload failed: " + err.message)
      });
    }
  }

  loadProfileImage() {
    this.userService.getProfileImage(this.userId).subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  ngOnInit() {
    this.loadProfileImage(); // load image when page opens
  }
}

