import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { Resume } from '../../shared/models/resume';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { ResumeService } from '../../services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class ResumeFormComponent {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  resumeForm: FormGroup;
  newResume!: Resume;
  protected _snackBar = inject(MatSnackBar);
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  constructor(protected fb: FormBuilder, protected resumeService: ResumeService, protected router: Router) {
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
      skills: this.fb.array([this.fb.control('')]),
      additionalInfo: ['']
    });
  }

  onSubmit() {
    this.newResume = this.resumeForm.value as Resume;
    this.resumeService.addResume(this.newResume);
    this.resumeForm.reset();
    this.formGroupDirective.resetForm();
    this.openSnackBar('Resume submitted successfully!', 'Close');
    this.router.navigate(['/pro-filer/resume-details']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
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
      employer: [''],
      title: [''],
      city: [''],
      state: [''],
      startDate: [''],
      endDate: [new Date()],
      description: this.fb.array([this.fb.control('')]),
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
      institution: [''],
      city: [''],
      state: [''],
      degree: [''],
      fieldOfStudy: [''],
      graduationDate: [''],
      description: [''],
      awards: this.fb.array([this.fb.control('')]),
    })
  }

  addEducation() {
    this.educations.controls.push(this.newEducationControl());
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }

  addSkill() {
    this.skills.controls.push(this.fb.control(''));
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addDescription(experienceIndex: number) {
    this.getDescription(experienceIndex).push(this.fb.control(''));
  }

  removeDescription(experienceIndex: number, descriptionIndex: number) {
    this.getDescription(experienceIndex).removeAt(descriptionIndex);
  }

  addAward(educationIndex: number) {
    this.getAwards(educationIndex).push(this.fb.control(''));
  }
  removeAward(educationIndex: number, awardIndex: number) {
    this.getAwards(educationIndex).removeAt(awardIndex);
  }

}