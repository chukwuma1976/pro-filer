import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.error('An error occurred:', error);
  }

}
