import { Component } from '@angular/core';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-unique-template',
  imports: [CommonModule, MatIcon],
  templateUrl: './unique-template.component.html',
  styleUrl: './unique-template.component.scss'
})
export class UniqueTemplateComponent extends DefaultTemplateComponent {

}
