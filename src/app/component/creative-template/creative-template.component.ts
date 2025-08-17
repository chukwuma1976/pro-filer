import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-creative-template',
  imports: [CommonModule, MatIcon],
  templateUrl: './creative-template.component.html',
  styleUrl: './creative-template.component.scss'
})
export class CreativeTemplateComponent extends DefaultTemplateComponent {

}
