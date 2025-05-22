import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogModule
} from '@angular/material/dialog';
import { ResumeService } from '../../services/resume.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private resumeService: ResumeService) {
    this.id = data.id;
    this.message = data.message;
    this.header = data.header;
  }

  delete() {
    if (this.id) {
      this.resumeService.deleteResume(this.id);
    } else {
      console.error('No id provided for deletion');
    }
  }

}
