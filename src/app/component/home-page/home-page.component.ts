import { Component } from '@angular/core';
import { PreviewResumeComponent } from '../preview-resume/preview-resume.component';
import { ResumeDetailsComponent } from '../resume-details/resume-details.component';
import { MatButtonModule } from '@angular/material/button';
import { TEMPLATES } from '../../shared/constants';
import sampleResume from '../../shared/mock-data/sample-resume.json'
import blankResume from '../../shared/mock-data/blank-resume.json'
import { Resume } from '../../shared/models/resume';

@Component({
  selector: 'app-home-page',
  imports: [PreviewResumeComponent, ResumeDetailsComponent, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  formData: Resume = sampleResume;
  dynamicFormData: Resume = { ...blankResume };
  typingSpeed = 10;  //Milliseconds per character
  templates = TEMPLATES;
  buttonsDisabled = false;

  constructor() { }

  async ngOnInit() {
    console.log('Welcome to Pro-Filer! 👋');
    this.randomlyPickTemplate();
    await this.simulateFormFill();
    console.log('🎉 All fields filled!');
  }

  demoTemplate(template: any) {
    this.dynamicFormData = { ...blankResume };
    this.dynamicFormData["template"] = template.value;
    this.simulateFormFill();
  }

  randomlyPickTemplate() {
    const index = Math.floor(Math.random() * (this.templates.length - 1));
    this.dynamicFormData["template"] = this.templates[index].value;
  }

  async simulateFormFill(): Promise<void> {
    this.buttonsDisabled = true;

    const fields: string[] = Object.keys(this.formData);

    const objectFields = ["experience", "education"];
    const arrayFields = [
      "skills",
      "certifications",
      "projects",
      "publications",
      "volunteerExperience"
    ];
    const nonTextFields = ["id", "shareWithOthers", "template", "userId"];
    const arraysInsideObjects = ["description", "awards"];
    const dateFields = ["startDate", "endDate", "graduationDate"];

    for (const field of fields) {
      // Simple text fields
      if (!(objectFields.includes(field) || arrayFields.includes(field) || nonTextFields.includes(field))) {
        const value = this.formData[field as keyof Resume];
        const text: string = value !== undefined ? String(value) : '';
        await this.typeAnimation(field, text); // ⬅️ sequential
      }

      // Arrays of strings
      if (arrayFields.includes(field)) {
        const values: any = this.formData[field as keyof Resume];
        if (Array.isArray(values)) {
          (this.dynamicFormData as any)[field] = new Array(values.length);
          for (let i = 0; i < values.length; i++) {
            await this.typeAnimationArray(field, i, values[i]); // ⬅️ sequential
          }
        }
      }

      // Arrays of objects (experience, education)
      if (objectFields.includes(field)) {
        const value = this.formData[field as keyof Resume];
        if (Array.isArray(value) && value.length > 0) {
          (this.dynamicFormData as any)[field] = new Array(value.length)
            .fill(null)
            .map(() => ({}));

          for (let index1 = 0; index1 < value.length; index1++) {
            const obj = value[index1];
            if (typeof obj === 'object' && obj !== null) {
              for (const key of Object.keys(obj)) {
                if (!arraysInsideObjects.includes(key)) {
                  const text = (obj as Record<string, any>)[key];
                  if (dateFields.includes(key)) {
                    (this.dynamicFormData as any)[field][index1][key] = text;
                  } else {
                    await this.typeAnimationObject(field, index1, key, text); // ⬅️ sequential
                  }
                } else {
                  const elements = (obj as any)[key];
                  (this.dynamicFormData as any)[field][index1][key] = new Array(elements.length);
                  for (let i = 0; i < elements.length; i++) {
                    await this.typeAnimationObjectArray(field, index1, key, i, elements[i]); // ⬅️ sequential
                  }
                }
              }
            }
          }
        }
      }
    }

    this.buttonsDisabled = false;
  }

  // Simple top-level text field
  typeAnimation(fieldName: string, text: string): Promise<void> {
    return new Promise(resolve => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          const partialText = text.substring(0, currentIndex);
          (this.dynamicFormData as any)[fieldName] = partialText;
          currentIndex++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, this.typingSpeed);
    });
  }

  // Arrays of strings (skills, certifications, etc.)
  typeAnimationArray(fieldName: string, index: number, text: string): Promise<void> {
    return new Promise(resolve => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          const partialText = text.substring(0, currentIndex);
          (this.dynamicFormData as any)[fieldName][index] = partialText;
          currentIndex++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, this.typingSpeed);
    });
  }

  // Objects inside arrays (experience, education, etc.)
  typeAnimationObject(fieldName: string, index1: number, property: string, text: string): Promise<void> {
    return new Promise(resolve => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          const partialText = text.substring(0, currentIndex);
          (this.dynamicFormData as any)[fieldName][index1][property] = partialText;
          currentIndex++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, this.typingSpeed);
    });
  }

  // Nested arrays inside objects (description, awards, etc.)
  typeAnimationObjectArray(
    fieldName: string,
    index1: number,
    property: string,
    index2: number,
    text: string
  ): Promise<void> {
    return new Promise(resolve => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          const partialText = text.substring(0, currentIndex);
          (this.dynamicFormData as any)[fieldName][index1][property][index2] = partialText;
          currentIndex++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, this.typingSpeed);
    });
  }
}
