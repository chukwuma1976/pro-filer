import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modern-template',
  imports: [CommonModule],
  templateUrl: './modern-template.component.html',
  styleUrl: './modern-template.component.scss'
})
export class ModernTemplateComponent extends DefaultTemplateComponent {

}
