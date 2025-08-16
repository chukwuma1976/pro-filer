import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-combination-template',
  imports: [CommonModule],
  templateUrl: './combination-template.component.html',
  styleUrl: './combination-template.component.scss'
})
export class CombinationTemplateComponent extends DefaultTemplateComponent {

}
