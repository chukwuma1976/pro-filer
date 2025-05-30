import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  formatDate(date: string | Date | undefined): any {
    if (!date) {
      return 'N/A'; // Return 'N/A' if date is undefined or null
    }
    if (typeof date === 'string') {
      if (date.toLowerCase() === 'present') return 'present';

      const dateArray = date.split('-');
      const month = dateArray[1][0] === '0' ? dateArray[1][1] : dateArray[1]; // Handle single digit months
      const year = dateArray[0];
      return month + '/' + year;
    } else if (!(date instanceof Date)) {
      const dateObj = new Date(date);
      return (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
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
}
