import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Resume } from '../../shared/models/resume';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ResumeService } from '../../services/resume.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../pop-up/pop-up.component';

@Component({
  selector: 'app-resume-tool-header',
  imports: [RouterLink, MatDividerModule, MatButtonModule],
  templateUrl: './resume-tool-header.component.html',
  styleUrl: './resume-tool-header.component.scss'
})
export class ResumeToolHeaderComponent {

  @Input() resume: Resume | null = null; // Input property to receive the resume ID

  constructor(private resumeService: ResumeService, private dialog: MatDialog) { } // Inject the ResumeService

  getPDF() {
    // Logic to generate PDF from the resume data
    console.log('Generating PDF for resume:', this.resume);
  }

  deleteResume(resumeId: string) {
    // Logic to delete the resume
    console.log('Deleting resume:', resumeId);
    // You can call a service method to delete the resume from the backend or local storage
  }

  printResume() {
    // Logic to print the resume
    console.log('Printing resume:', this.resume);
    // You can use window.print() or any other method to print the resume
    window.print();
  }

  openDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        id: this.resume?.id,
      }
    });
  }

}
