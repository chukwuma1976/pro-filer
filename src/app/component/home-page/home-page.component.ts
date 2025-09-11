import { Component } from '@angular/core';
import { PreviewResumeComponent } from '../preview-resume/preview-resume.component';
import { ResumeDetailsComponent } from '../resume-details/resume-details.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { TEMPLATES } from '../../shared/constants';
import { delay } from 'rxjs';
import sampleResume from '../../shared/mock-data/sample-resume.json'
import blankResume from '../../shared/mock-data/blank-resume.json'
import { Resume } from '../../shared/models/resume';

@Component({
  selector: 'app-home-page',
  imports: [PreviewResumeComponent, ResumeDetailsComponent, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  // animations: [
  //   trigger('staggeredEnter', [
  //     transition(':enter', [
  //       query('input', [
  //         style({ opacity: 0, transform: 'translateY(-10px)' }),
  //         stagger('200ms', [
  //           animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  //         ])
  //       ], { optional: true })
  //     ])
  //   ])
  // ]
})
export class HomePageComponent {
  formData: Resume = sampleResume;
  dynamicFormData: Resume = { ...blankResume };
  typingSpeed = 100;  //Milliseconds per character
  templates = TEMPLATES;
  buttonsDisabled = false;

  constructor() { }

  ngOnInit() {
    this.simulateFormFill();
  }

  demoTemplate(template: any) {
    this.dynamicFormData = { ...blankResume };
    this.dynamicFormData["template"] = template.value;
    this.simulateFormFill();
  }

  simulateFormFill() {
    console.log(this.buttonsDisabled);
    const fields: string[] = Object.keys(this.formData);
    const objectFields = [
      "experience",
      "education",
    ];
    const arrayFields = [
      "skills",
      "certifications",
      "projects",
      "publications",
      "volunteerExperience"
    ];
    const nonTextFields = [
      "id",
      "shareWithOthers",
      "template",
      "userId"
    ];
    let delayAmount = 500;

    fields.forEach((field: string) => {
      if (!(objectFields.includes(field) || arrayFields.includes(field) || nonTextFields.includes(field))) {
        const value = this.formData[field as keyof Resume];
        const text: string = value !== undefined ? String(value) : '';
        this.typeAnimation(field, text);
      }
      if (arrayFields.includes(field)) {
        const values = this.formData[field as keyof Resume];
        if (Array.isArray(values)) {
          (values as string[]).forEach((value: string, index: number) => {
            this.typeAnimationArray(field, index, value);
          });
        }
      }
      if (objectFields.includes(field)) {
        const arrays = ['description', 'awards'];
        const value = this.formData[field as keyof Resume];
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((obj: any, index1: number) => {
            if (typeof obj === 'object' && obj !== null) {
              Object.keys(obj).forEach((val: string) => {
                if (!arrays.includes(val)) {
                  const text = (obj as Record<string, any>)[val];
                  this.typeAnimationObject(field, val, text);
                } else {
                  const elements = (obj as Record<string, any>)[val];
                  (elements as string[]).forEach((text: string, index: number) => {
                    this.typeAnimationObjectArray(field, index1, val, index, text);
                  });
                }
              });
            }
          })
        }
      }
    });
  }

  typeAnimation(fieldName: string, text: string) {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        const partialText = text.substring(0, currentIndex);
        (this.dynamicFormData as any)[fieldName] = partialText;
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, this.typingSpeed);
  }

  typeAnimationArray(fieldName: string, index: number, text: string) {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        const partialText = text.substring(0, currentIndex);
        (this.dynamicFormData as any)[fieldName][index] = partialText;
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, this.typingSpeed);
  }

  typeAnimationObject(fieldName: string, property: string, text: string) {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        const partialText = text.substring(0, currentIndex);
        (this.dynamicFormData as any)[fieldName][0][property] = partialText;
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, this.typingSpeed);
  }

  typeAnimationObjectArray(fieldName: string, index1: number, property: string, index2: number, text: string) {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        const partialText = text.substring(0, currentIndex);
        (this.dynamicFormData as any)[fieldName][index1][property][index2] = partialText;
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, this.typingSpeed);
  }
}
