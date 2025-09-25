import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resume } from '../shared/models/resume';
import { MONTHS_OBJECT } from '../shared/constants';
import { PopUpComponent } from '../component/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  protected _snackBar = inject(MatSnackBar);
  constructor() { }

  formatDate(date: string | Date | undefined, displayMonthsName: boolean = false): any {
    const months = MONTHS_OBJECT
    if (!date) {
      return 'N/A'; // Return 'N/A' if date is undefined or null
    }
    if (typeof date === 'string') {
      if (date.toLowerCase() === 'present') return 'present';

      const dateArray = date.split('-');
      const month = dateArray[1][0] === '0' ? dateArray[1][1] : dateArray[1]; // Handle single digit months
      const year = dateArray[0];
      const displayedMonth = displayMonthsName ? (months[month as keyof typeof months] + ' ') : (month + '/')
      return displayedMonth + year;
    } else if ((date instanceof Date)) {
      const dateObj = new Date(date);
      const month = String(dateObj.getMonth() + 1)
      const displayedMonth = displayMonthsName ? (months[month as keyof typeof months] + ' ') : (month + '/')
      return displayedMonth + dateObj.getFullYear();
    }
  }

  returnDate(date: string | Date | undefined): Date {
    if (!date) {
      return new Date(); // Return current date if date is undefined or null
    }
    if (typeof date === 'string') {
      if (date.toLowerCase() === 'present') return new Date(); // Return current date for 'present'

      const dateArray = date.split('-');
      const year = parseInt(dateArray[0], 10);
      const month = parseInt(dateArray[1], 10) - 1; // Months are zero-indexed in JavaScript
      const day = parseInt(dateArray[2], 10);
      return new Date(year, month, day);
    } else if (!(date instanceof Date)) {
      return new Date(date); // Convert string to Date object
    }
    return date; // If it's already a Date object, return it
  }

  openSnackBar(message: string, action: string, timeInMs: number = 5000) {
    this._snackBar.open(message, action, {
      duration: timeInMs
    });
  }

  sortExperiencesByDate(experiences: any[]): any[] {
    return experiences.sort((a, b) => {
      const dateA = a.endDate.toLowerCase() !== "present" ? new Date(a.endDate) : new Date();
      const dateB = b.endDate.toLowerCase() !== "present" ? new Date(b.endDate) : new Date();
      return dateB.getTime() - dateA.getTime();
    });
  }

  sortEducationsByDate(educations: any[]): any[] {
    return educations.sort((a, b) => {
      const dateA = a.graduationDate.toLowerCase() !== "present" ? new Date(a.graduationDate) : new Date();
      const dateB = b.graduationDate.toLowerCase() !== "present" ? new Date(b.graduationDate) : new Date();
      return dateB.getTime() - dateA.getTime();
    });
  }

  processResume(resume: Resume): Resume | undefined {
    if (resume) {
      return {
        ...resume,
        experience: this.sortExperiencesByDate(resume.experience),
        education: this.sortEducationsByDate(resume.education)
      };
    }
    return undefined;
  }

  getResumeDocumentId(id: number | string): string {
    return `resume-${id}`;
  }

  openDeleteDialog(dialog: MatDialog, resume: Resume) {
    dialog.open(PopUpComponent, {
      data: {
        id: resume?.id,
        message: 'Are you sure you want to delete this resume? This action cannot be undone.',
        header: 'Delete Resume',
        action: 'delete'
      }
    });
  }
}
