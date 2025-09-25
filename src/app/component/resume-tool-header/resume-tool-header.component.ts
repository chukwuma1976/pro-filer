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
import { UtilityService } from '../../services/utility.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-resume-tool-header',
  imports: [RouterLink, MatDividerModule, MatButtonModule, MatIcon],
  templateUrl: './resume-tool-header.component.html',
  styleUrl: './resume-tool-header.component.scss'
})
export class ResumeToolHeaderComponent {

  @Input() resume: Resume | null = null; // Input property to receive the resume ID
  pdf!: jsPDF;

  constructor(private resumeService: ResumeService, private dialog: MatDialog, private util: UtilityService) { } // Inject the ResumeService

  generatePDF() {
    const resumeDocumentId = this.util.getResumeDocumentId(this.resume!.id);
    console.log('generating pdf with id:', resumeDocumentId);
    const resumeToPrint: any = document.getElementById(resumeDocumentId);
    resumeToPrint.setAttribute('style', 'background-color: white;'); // Ensure background is white for better PDF quality
    html2canvas(resumeToPrint, { scale: 2 }).then((canvas) => {
      this.pdf = new jsPDF(); //PDF page height is 297
      const pdfWidth = this.pdf.internal.pageSize.getWidth();
      const pdfHeight = (resumeToPrint.offsetHeight * pdfWidth) / resumeToPrint.offsetWidth;
      this.pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      this.pdf.setProperties({
        title: 'Resume PDF',
        author: `${this.resume?.firstName} ${this.resume?.lastName}`
      });
      this.pdf.setFontSize(10);
      this.pdf.save(`Resume${this.resume?.firstName}${this.resume?.lastName}${this.resume?.id}.pdf`);
      this.util.openSnackBar('PDF generated successfully!', 'Close');
      resumeToPrint.removeAttribute('style'); // Clean up the style change
    });
  }

  openDeleteDialog() {
    if (this.resume) {
      this.util.openDeleteDialog(this.dialog, this.resume);
    }
  }

  belongsToUser() {
    // Compare the user ID with the resume's user ID
    return UserService.userId === this.resume?.userId
  }

  printResume() {
    const resumeElement = document.getElementById(String(this.resume?.id));
    const originalContents = document.body.innerHTML;
    if (resumeElement) {
      document.body.innerHTML = resumeElement.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }

}
