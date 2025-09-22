import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ResumeService } from '../../services/resume.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {

  id?: string;
  message?: string;
  header?: string;
  action?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private resumeService: ResumeService, private authService: AuthService, private router: Router) {
    this.id = data.id;
    this.message = data.message;
    this.header = data.header;
    this.action = data.action;
  }

  executeAction() {
    if (this.id && this.action === 'delete') {
      this.resumeService.deleteResume(this.id).subscribe(() => console.log('Resume with id of ', this.id, ' deleted'));
    };
    if (this.action === 'logout') {
      this.authService.logout().subscribe(response => {
        console.log(response.message);
        this.router.navigate(['/login']);
      });
    }
  }

}
