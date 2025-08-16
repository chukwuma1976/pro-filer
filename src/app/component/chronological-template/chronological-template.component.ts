import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chronological-template',
  imports: [CommonModule],
  templateUrl: './chronological-template.component.html',
  styleUrl: './chronological-template.component.scss'
})
export class ChronologicalTemplateComponent extends DefaultTemplateComponent {

}
