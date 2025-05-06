import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { Resume } from '../shared/models/resume';

@Component({
  selector: 'app-resume-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDatepicker,
    MatExpansionModule
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class ResumeFormComponent {

  resumeForm: FormGroup;
  newResume!: Resume;

  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      linkedIn: [''],
      website: [''],
      summary: ['', Validators.required],
      experience: this.fb.array([this.newExperienceControl()]),
      education: this.fb.array([this.newEducationControl()]),
      skills: this.fb.array([this.newSkillControl()]),
      additionalInfo: ['']
    });
  }

  onSubmit() {
    console.log(this.resumeForm.value);
    this.newResume = this.resumeForm.value as Resume;
    console.log(this.newResume);
    this.resumeForm.reset();
  }

  get experiences(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  get educations(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  getDescription(index: number): FormArray {
    return this.experiences.at(index).get('description') as FormArray;
  }

  getAwards(index: number): FormArray {
    return this.educations.at(index).get('awards') as FormArray;
  }

  newExperienceControl() {
    return this.fb.group({
      employer: ['', Validators.required],
      title: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [new Date(), Validators.required],
      description: this.fb.array([this.fb.group({ bulletPoint: ['', Validators.required] })]),
    })
  }

  addExperience() {
    this.experiences.controls.push(this.newExperienceControl());
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  newEducationControl(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      graduationDate: ['', Validators.required],
      description: [''],
      awards: this.fb.array([this.fb.group({ award: [''] })]),
    })
  }

  addEducation() {
    this.educations.controls.push(this.newEducationControl());
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }

  newSkillControl(): FormGroup {
    return this.fb.group({ skill: ['', Validators.required] });
  }

  addSkill() {
    this.skills.controls.push(this.newSkillControl());
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addDescription(experienceIndex: number) {
    const descriptionControl = this.fb.group({ bulletPoint: ['', Validators.required] });
    this.getDescription(experienceIndex).push(descriptionControl);
  }

  removeDescription(experienceIndex: number, descriptionIndex: number) {
    this.getDescription(experienceIndex).removeAt(descriptionIndex);
  }
  addAward(educationIndex: number) {
    const awardControl = this.fb.group({ award: [''] });
    this.getAwards(educationIndex).push(awardControl);
  }
  removeAward(educationIndex: number, awardIndex: number) {
    this.getAwards(educationIndex).removeAt(awardIndex);
  }

}