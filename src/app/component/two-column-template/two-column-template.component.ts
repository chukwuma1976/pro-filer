import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-two-column-template',
  imports: [CommonModule, MatIconModule],
  templateUrl: './two-column-template.component.html',
  styleUrl: './two-column-template.component.scss'
})
export class TwoColumnTemplateComponent extends DefaultTemplateComponent {

}
