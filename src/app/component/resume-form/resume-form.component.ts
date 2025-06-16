import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormGroupDirective, FormControl, AbstractControl } from '@angular/forms';
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
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { customDateValidator } from '../../custom-validators/custom-date-validator';
import { TOOL_TIP_MESSAGES } from '../../shared/constants';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STATES_DROPDOWN, DEGREE_OPTIONS } from '../../shared/constants';
import { map, Observable, startWith } from 'rxjs';
import { UserService } from '../../services/user.service';

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
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule
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
  shareResumeMessage = TOOL_TIP_MESSAGES.shareResume;
  ifCurrentlyEmployedMessage = TOOL_TIP_MESSAGES.ifCurrentlyEmployed;
  stateWillBeAbbreviatedMessage = TOOL_TIP_MESSAGES.stateWillBeAbbreviated;

  stateOptions = STATES_DROPDOWN
  degreeOptions = DEGREE_OPTIONS
  filteredStateOptionsExp!: Observable<any[]>;
  filteredStateOptionsEdu!: Observable<any[]>;
  filteredDegreeOptions!: Observable<any[]>;

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
      skills: this.fb.array([this.fb.control('', Validators.required)]),
      additionalInfo: [''],
      shareWithOthers: [false],
    });

    this.experiences.controls.forEach((control, index) => this.manageExperienceStateFilter(index));
    this.educations.controls.forEach((control, index) => this.manageEducationStateFilter(index));
    this.educations.controls.forEach((control, index) => this.manageEducationDegreeFilter(index));
  }

  onSubmit() {
    this.newResume = this.resumeForm.value as Resume;
    this.newResume.experience.map((exp: any) => {         // any experience end date is set to 'present' if it is the current date
      exp.endDate = this.processPresentAsEndDate(exp.endDate);
    });
    this.resumeService.addResume(this.newResume, UserService.userId).subscribe(data => console.log(data));
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

  manageExperienceStateFilter(i: number) {
    const control = this.experiences.at(i).get('state');
    if (control) {
      this.filteredStateOptionsExp = control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', this.stateOptions)),
      );
    }
  }

  manageEducationStateFilter(i: number) {
    const control = this.educations.at(i).get('state');
    if (control) {
      this.filteredStateOptionsEdu = control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', this.stateOptions)),
      );
    }
  }

  manageEducationDegreeFilter(i: number) {
    const control = this.educations.at(i).get('degree');
    if (control) {
      this.filteredDegreeOptions = control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value.name || '', this.degreeOptions)),
      );
    }
  }

  protected _filter(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
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
      startDate: ['', [Validators.required, customDateValidator()]],
      endDate: [new Date(), [Validators.required, customDateValidator()]],
      description: this.fb.array([this.fb.control('', Validators.required)]),
    })
  }

  addExperience() {
    this.experiences.push(this.newExperienceControl());
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
    this.resumeForm.markAsDirty();
  }

  newEducationControl(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      graduationDate: ['', Validators.required],
      descriptionEdu: [''],
      awards: this.fb.array([]),
    })
  }

  addEducation() {
    this.educations.push(this.newEducationControl());
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
    this.resumeForm.markAsDirty();
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
    this.resumeForm.markAsDirty();
  }

  addDescription(experienceIndex: number) {
    this.getDescription(experienceIndex).push(this.fb.control('', Validators.required));
  }

  removeDescription(experienceIndex: number, descriptionIndex: number) {
    this.getDescription(experienceIndex).removeAt(descriptionIndex);
    this.resumeForm.markAsDirty();
  }

  addAward(educationIndex: number) {
    this.getAwards(educationIndex).push(this.fb.control('', Validators.required));
  }
  removeAward(educationIndex: number, awardIndex: number) {
    this.getAwards(educationIndex).removeAt(awardIndex);
    this.resumeForm.markAsDirty();
  }

  processPresentAsEndDate(endDate: Date): string | Date {
    const currentDate = new Date();
    const yearIsEqual = endDate.getFullYear() === currentDate.getFullYear();
    const monthIsEqual = endDate.getMonth() === currentDate.getMonth();
    const dayIsEqual = endDate.getDate() === currentDate.getDate();
    if (yearIsEqual && monthIsEqual && dayIsEqual) return 'present';
    return endDate;
  }

}