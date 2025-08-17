import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-template',
  imports: [CommonModule],
  templateUrl: './simple-template.component.html',
  styleUrl: './simple-template.component.scss'
})
export class SimpleTemplateComponent extends DefaultTemplateComponent {

}
