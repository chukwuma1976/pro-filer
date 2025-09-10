import { Component } from '@angular/core';
import { PreviewResumeComponent } from '../preview-resume/preview-resume.component';
import { ResumeDetailsComponent } from '../resume-details/resume-details.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { delay } from 'rxjs';
import sampleResume from '../../shared/mock-data/sample-resume.json'
import blankResume from '../../shared/mock-data/blank-resume.json'
import { Resume } from '../../shared/models/resume';

@Component({
  selector: 'app-home-page',
  imports: [PreviewResumeComponent, ResumeDetailsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [
    trigger('staggeredEnter', [
      transition(':enter', [
        query('input', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger('200ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomePageComponent {
  formData: Resume = sampleResume;
  dynamicFormData: Resume = { ...blankResume };

  constructor() { }

  ngOnInit() {
    this.simulateFormFill();
  }

  simulateFormFill() {
    const fields: string[] = Object.keys(this.formData);
    const objectFields = [
      "experience",
      "education",
      "skills",
      "certifications",
      "projects",
      "publications",
      "volunteerExperience"
    ]
    const nonTextFields = [
      "id",
      "shareWithOthers",
      "template",
      "userId"
    ]
    let delayAmount = 500;

    fields.forEach((field: string) => {
      if (!(objectFields.includes(field) || nonTextFields.includes(field))) {
        console.log('typing called: ', field);
        const value = this.formData[field as keyof Resume];
        const text: string = value !== undefined ? String(value) : '';
        this.typeAnimation(field, text);
      }
    });
  }

  typeAnimation(fieldName: string, text: string) {
    let currentIndex = 0;
    const typingSpeed = 50 //Milliseconds per character
    const initialDelay = text.length * typingSpeed; //total time to type text in milliseconds

    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        const partialText = text.substring(0, currentIndex);
        (this.dynamicFormData as any)[fieldName] = partialText;
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);
  }
}
