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
    MatTooltipModule
  ],
  templateUrl: './resume-edit-form.component.html',
  styleUrl: './resume-edit-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class ResumeEditFormComponent extends ResumeFormComponent {

  initialState!: Resume;
  updatedResume!: Resume;

  constructor(fb: FormBuilder, resumeService: ResumeService, router: Router, private route: ActivatedRoute) {
    super(fb, resumeService, router);
    this.resumeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      linkedIn: [''],
      website: [''],
      summary: ['', Validators.required],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      additionalInfo: ['']
    });
  }

  ngOnInit() {
    const resumeId = this.route.snapshot.paramMap.get('id'); console.log('Resume ID:', resumeId);
    const resume = resumeId ? this.resumeService.getResumeById(resumeId) : undefined;
    if (resume) {
      this.populateUpdateForm(resume);
    }
    this.detectValueChanges();
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
      const newSkill: any = this.fb.control(skill);
      this.skills.controls.push(newSkill);
    });
    this.initialState = this.resumeForm.value as Resume;
  }

  newUserExperienceControl(experience: any): FormGroup {
    const addedExperience = this.fb.group({
      employer: [experience.employer],
      title: [experience.title],
      city: [experience.city],
      state: [experience.state],
      startDate: [experience.startDate],
      endDate: [experience.endDate],
      description: this.fb.array([]),
    });

    experience.description.forEach((desc: any) => {
      const descriptionGroup = this.fb.control(desc);
      (addedExperience.get('description') as FormArray).push(descriptionGroup);
    });

    return addedExperience;
  }

  addUserExperience(addedExperience: FormControl) {
    this.experiences.controls.push(addedExperience);
  }

  newUserEducationControl(education: any): FormGroup {
    const addedEducation = this.fb.group({
      institution: [education.institution],
      city: [education.city],
      state: [education.state],
      degree: [education.degree],
      fieldOfStudy: [education.fieldOfStudy],
      graduationDate: [education.graduationDate],
      description: [education.description],
      awards: this.fb.array([]),
    })

    education.awards.forEach((award: any) => {
      const awardGroup = this.fb.control(award);
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

  deepEqual(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  detectValueChanges() {
    //iterate through nested controls to detect changes and mark form as dirty
    this.experiences.controls.forEach((control) => {
      control.valueChanges.subscribe(change => {
        console.log(change);
        Object.keys(change).includes('employer') && this.resumeForm.markAsDirty();
      })
    })
    this.educations.controls.forEach((control) => {
      control.valueChanges.subscribe(change => {
        console.log(change);
        Object.keys(change).includes('institution') && this.resumeForm.markAsDirty();
      })
    })
    this.skills.controls.forEach((control) => {
      control.valueChanges.subscribe(change => {
        console.log(change);
        change !== "" && this.resumeForm.markAsDirty();
      })
    })
  }

  onEdit() {
    if (this.resumeForm.valid) {
      if (this.resumeForm.dirty) {
        this.updatedResume = this.resumeForm.value;
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
