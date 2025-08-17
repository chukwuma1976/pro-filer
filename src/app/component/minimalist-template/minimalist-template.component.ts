import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minimalist-template',
  imports: [CommonModule],
  templateUrl: './minimalist-template.component.html',
  styleUrl: './minimalist-template.component.scss'
})
export class MinimalistTemplateComponent extends DefaultTemplateComponent {

}
