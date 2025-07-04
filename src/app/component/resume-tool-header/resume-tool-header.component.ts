import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Resume } from '../../shared/models/resume';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ResumeService } from '../../services/resume.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-tool-header',
  imports: [RouterLink, MatDividerModule, MatButtonModule, MatIcon],
  templateUrl: './resume-tool-header.component.html',
  styleUrl: './resume-tool-header.component.scss'
})
export class ResumeToolHeaderComponent {

  @Input() resume: Resume | null = null; // Input property to receive the resume ID
  pdf!: jsPDF;

  constructor(private resumeService: ResumeService, private dialog: MatDialog) { } // Inject the ResumeService

  generatePDF() {
    console.log('generate pdf');
    const resumeToPrint: any = document.getElementById(String(this.resume!.id));
    html2canvas(resumeToPrint, { scale: 2 }).then((canvas) => {
      this.pdf = new jsPDF();
      this.pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      this.pdf.setProperties({
        title: 'Resume PDF',
        author: `${this.resume?.firstName} ${this.resume?.lastName}`
      });
      this.pdf.setFontSize(10);
      this.pdf.save(`Resume${this.resume?.id}.pdf`);
    });
  }

  openDeleteDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        id: this.resume?.id,
        message: 'Are you sure you want to delete this resume? This action cannot be undone.',
        header: 'Delete Resume',
        action: 'delete'
      }
    });
  }

}
