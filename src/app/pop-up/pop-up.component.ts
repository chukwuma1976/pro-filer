import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogModule
} from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {

  id?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

}
