import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTemplateComponent } from '../default-template/default-template.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-visual-professional-template',
  imports: [CommonModule],
  templateUrl: './visual-professional-template.component.html',
  styleUrl: './visual-professional-template.component.scss'
})

export class VisualProfessionalTemplateComponent extends DefaultTemplateComponent {

}
