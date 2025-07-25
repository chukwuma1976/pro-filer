import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { Resume } from '../../shared/models/resume';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { ResumeFormComponent } from '../resume-form/resume-form.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { UtilityService } from '../../services/utility.service';
import { ExperienceService } from '../../services/experience.service';
import { EducationService } from '../../services/education.service';
import { merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { customDateValidator } from '../../custom-validators/custom-date-validator';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { get } from 'http';
// Add this import if TOOL_TIP_MESSAGES is exported from a shared constants file
import { TOOL_TIP_MESSAGES } from '../../shared/constants';

@Component({
  selector: 'app-resume-edit-form',
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
    MatCheckbox,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  templateUrl: './resume-edit-form.component.html',
  styleUrl: './resume-edit-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class ResumeEditFormComponent extends ResumeFormComponent {

  initialState!: Resume;
  updatedResume!: Resume;
  resumeId!: number | string;
  editExperienceMessage = TOOL_TIP_MESSAGES.editExperienceMessage;
  editEducationMessage = TOOL_TIP_MESSAGES.editEducationMessage;

  constructor(
    fb: FormBuilder,
    resumeService: ResumeService,
    router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private experienceService: ExperienceService,
    private educationService: EducationService) {

    super(fb, resumeService, router);
    this.resumeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      linkedIn: [''],
      website: [''],
      summary: ['', Validators.required],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      additionalInfo: [''],
      shareWithOthers: [false],
    });
  }

  ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.resumeId !== null) {
      this.resumeService.getResumeById(this.resumeId).subscribe(resume => {
        this.updatedResume = resume;
        this.populateUpdateForm(this.updatedResume);
      });
    } else {
      // Handle the case where resumeId is null, e.g., show an error or redirect
      this._snackBar.open('Invalid resume ID.', 'Close', { duration: 5000 });
      this.router.navigate(['/pro-filer/resume-details']);
    }
    // this.processValueChanges();  //to capture changes in FormArray form controls
  }

  processDate(date: Date): Date {
    return this.utilityService.returnDate(date);
  }

  populateUpdateForm(resume: Resume | any) {
    this.resumeForm.patchValue(resume);

    resume.experience.forEach((exp: any) => {
      const newExperience: any = this.newUserExperienceControl(exp);
      this.addUserExperience(newExperience);
    });

    resume.education.forEach((edu: any) => {
      const newEducation: any = this.newUserEducationControl(edu);
      this.addUserEducation(newEducation);
    });

    resume.skills.forEach((skill: any) => {
      const newSkill: any = this.fb.control(skill, Validators.required);
      this.skills.controls.push(newSkill);
    });
    this.initialState = this.resumeForm.value as Resume;
  }

  //All experience controls are disabled by default, will update in separate form
  newUserExperienceControl(experience: any): FormGroup {
    const addedExperience = this.fb.group({
      id: [experience.id],
      employer: [{ value: experience.employer, disabled: true }],
      title: [{ value: experience.title, disabled: true }],
      city: [{ value: experience.city, disabled: true }],
      state: [{ value: experience.state, disabled: true }],
      startDate: [{ value: new Date(experience.startDate), disabled: true }, customDateValidator()],
      endDate: [{ value: this.processDate(experience.endDate), disabled: true }, customDateValidator()],
      description: this.fb.array([]),
    });

    experience.description.forEach((desc: any) => {
      const descriptionGroup = this.fb.control({ value: desc, disabled: true });
      (addedExperience.get('description') as FormArray).push(descriptionGroup);
    });

    return addedExperience;
  }

  addUserExperience(addedExperience: FormControl) {
    this.experiences.controls.push(addedExperience);
  }

  //All education controls are disabled by default, will update in separate form
  newUserEducationControl(education: any): FormGroup {
    const addedEducation = this.fb.group({
      id: [education.id],
      institution: [{ value: education.institution, disabled: true }],
      city: [{ value: education.city, disabled: true }],
      state: [{ value: education.state, disabled: true }],
      degree: [{ value: education.degree, disabled: true }],
      fieldOfStudy: [{ value: education.fieldOfStudy, disabled: true }],
      graduationDate: [{ value: new Date(education.graduationDate), disabled: true }],
      descriptionEdu: [{ value: education.descriptionEdu, disabled: true }],
      awards: this.fb.array([]),
    })

    education.awards.forEach((award: any) => {
      const awardGroup = this.fb.control({ value: award, disabled: true });
      (addedEducation.get('awards') as FormArray).push(awardGroup);
    });

    return addedEducation;
  }

  addUserEducation(addedEducation: FormControl) {
    this.educations.controls.push(addedEducation);
  }

  goBack() {
    this.router.navigate(['/pro-filer/resume-details']);
  }

  override addExperience(): void {
    this.router.navigate([`/pro-filer/add-experience/${this.resumeId}`]); // Redirect to the experience form with the resumeId  
  }

  editExperience(index: number): void {
    const id = this.getExperienceId(index);
    this.router.navigate([`/pro-filer/edit-experience/${this.resumeId}/${id}`]); // Redirect to the experience edit form with the experience id
  }

  getExperienceId(index: number): number | string {
    return this.updatedResume.experience[index].id;
  }

  override removeExperience(index: number) {
    this.experiences.removeAt(index);
    const experienceId = this.getExperienceId(index);
    this.experienceService.deleteExperience(experienceId).subscribe((data: any) => console.log('experience removed at index  of: ', index));
    this.resumeForm.markAsDirty();
  }

  override addEducation(): void {
    this.router.navigate([`/pro-filer/add-education/${this.resumeId}`]); // Redirect to the education form with the resumeId  
  }

  editEducation(index: number): void {
    const id = this.getEducationId(index);
    this.router.navigate([`/pro-filer/edit-education/${this.resumeId}/${id}`]); // Redirect to the education edit form with the education id
  }
  getEducationId(index: number): number | string {
    return this.updatedResume.education[index].id;
  }

  override removeEducation(index: number) {
    this.educations.removeAt(index);
    const educationId = this.getEducationId(index);
    this.educationService.deleteEducation(educationId).subscribe((data: any) => console.log('education removed at index of: ', index));
    this.resumeForm.markAsDirty();
  }

  onEdit() {
    if (this.resumeForm.valid) {
      if (this.resumeForm.dirty) {
        this.updatedResume = this.resumeForm.value;
        this.updatedResume.id = this.resumeId;
        this.updatedResume.experience.map((exp: any) => {         // any experience end date is set to 'present' if it is the current date
          exp.endDate = this.processPresentAsEndDate(exp.endDate);
        });
        this.resumeService.editResume(this.updatedResume).subscribe(data => console.log(data));
        this._snackBar.open('Resume updated successfully!', 'Close', { duration: 5000 });
        this.router.navigate(['/pro-filer/resume-details']);
      }
      else {
        this._snackBar.open('No changes made to the resume.', 'Close', { duration: 5000 });
      }
    } else {
      this._snackBar.open('Please fill in all required fields.', 'Close', { duration: 5000 });
    }
  }

}
