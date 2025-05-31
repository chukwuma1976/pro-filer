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
import { merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { customDateValidator } from '../../custom-validators/custom-date-validator';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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

  constructor(fb: FormBuilder, resumeService: ResumeService, router: Router, private route: ActivatedRoute, private utilityService: UtilityService) {
    super(fb, resumeService, router);
  }

  ngOnInit() {
    const resumeId = this.route.snapshot.paramMap.get('id');
    const resume = resumeId ? this.resumeService.getResumeById(resumeId) : undefined;
    if (resume) {
      this.populateUpdateForm(resume);
    }
    this.processValueChanges();  //to capture changes in FormArray form controls
  }

  processDate(date: Date): Date {
    return this.utilityService.returnDate(date);
  }

  processValueChanges() {
    merge(...this.experiences.controls.map((control, index) => control.valueChanges.pipe(
      map((value) => ({ index, value })),
      debounceTime(1000) // Debounce to reduce the number of updates  
    ))).subscribe((changes) => {
      this.experiences.removeAt(changes.index);
      this.experiences.insert(changes.index, this.newUserExperienceControl(changes.value));
      this.resumeForm.markAsDirty();
    });

    merge(...this.educations.controls.map((control, index) => control.valueChanges.pipe(
      map((value) => ({ index, value })),
      debounceTime(1000) // Debounce to reduce the number of updates  
    ))).subscribe((changes) => {
      this.educations.removeAt(changes.index);
      this.educations.insert(changes.index, this.newUserEducationControl(changes.value));
      this.resumeForm.markAsDirty();
    });
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

  newUserExperienceControl(experience: any): FormGroup {
    const addedExperience = this.fb.group({
      employer: [experience.employer, Validators.required],
      title: [experience.title, Validators.required],
      city: [experience.city, Validators.required],
      state: [experience.state, Validators.required],
      startDate: [new Date(experience.startDate), [Validators.required, customDateValidator()]],
      endDate: [this.processDate(experience.endDate), [Validators.required, customDateValidator()]],
      description: this.fb.array([]),
    });

    experience.description.forEach((desc: any) => {
      const descriptionGroup = this.fb.control(desc, Validators.required);
      (addedExperience.get('description') as FormArray).push(descriptionGroup);
    });

    return addedExperience;
  }

  addUserExperience(addedExperience: FormControl) {
    this.experiences.controls.push(addedExperience);
  }

  newUserEducationControl(education: any): FormGroup {
    const addedEducation = this.fb.group({
      institution: [education.institution, Validators.required],
      city: [education.city, Validators.required],
      state: [education.state, Validators.required],
      degree: [education.degree, Validators.required],
      fieldOfStudy: [education.fieldOfStudy, Validators.required],
      graduationDate: [new Date(education.graduationDate), Validators.required],
      descriptionEdu: [education.descriptionEdu],
      awards: this.fb.array([]),
    })

    education.awards.forEach((award: any) => {
      const awardGroup = this.fb.control(award, Validators.required);
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

  onEdit() {
    if (this.resumeForm.valid) {
      if (this.resumeForm.dirty) {
        this.updatedResume = this.resumeForm.value;
        this.updatedResume.experience.map((exp: any) => {         // any experience end date is set to 'present' if it is the current date
          exp.endDate = this.processPresentAsEndDate(exp.endDate);
        });
        this.resumeService.editResume(this.updatedResume);
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
