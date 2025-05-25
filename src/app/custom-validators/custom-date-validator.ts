import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function customDateValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;
    if (!date) return null; // If no date is provided, validation passes
    const currentDate = new Date();
    const newDate = date !== undefined ? new Date(date) : null;
    if (newDate && newDate > currentDate) {
      return { invalidDate: true };
    }

    return null;
  }
}
