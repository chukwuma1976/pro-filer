import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ats-friendly-template',
  imports: [CommonModule],
  templateUrl: './ats-friendly-template.component.html',
  styleUrl: './ats-friendly-template.component.scss'
})
export class ATSFriendlyTemplateComponent extends DefaultTemplateComponent {

}
