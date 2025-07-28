import { Component, ViewChild, inject } from '@angular/core';
import { EducationFormComponent } from '../education-form/education-form.component';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { customDateValidator } from '../../custom-validators/custom-date-validator';
import { DEGREE_OPTIONS, TOOL_TIP_MESSAGES } from '../../shared/constants';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STATES_DROPDOWN } from '../../shared/constants';
import { Observable } from 'rxjs';
import { EducationService } from '../../services/education.service';
import { Education } from '../../shared/models/education';
import e from 'express';

@Component({
  selector: 'app-education-edit-form',
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
  templateUrl: './education-edit-form.component.html',
  styleUrl: './education-edit-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class EducationEditFormComponent extends EducationFormComponent {
  id!: number | string;
  education!: Education;

  constructor(
    fb: FormBuilder,
    educationService: EducationService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super(fb, educationService, router, route);
  }

  override ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('resumeId') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      this.educationService.getEducationById(this.id).subscribe(
        education => this.populateUpdateForm(education)
      )
    }
  }

  populateUpdateForm(education: Education) {
    this.educationForm.patchValue({
      id: education.id,
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      city: education.city,
      state: education.state,
      graduationDate: education.graduationDate,
      educationDescription: education.descriptionEdu,
    });
    this.educationForm.setControl('awards', this.fb.array((education.awards ?? []).map(desc => this.fb.control(desc, Validators.required))));
  }

  onUpdate() {
    console.log('Updating education with ID:', this.id);
    this.newEducation = this.educationForm.value as Education;
    this.newEducation.id = this.id;
    this.educationService.editEducation(this.newEducation).subscribe({
      next: () => {
        this._snackBar.open('Education updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['pro-filer/edit-resume', this.resumeId]);
      },
      error: (error) => {
        console.error('Error updating education:', error);
        this._snackBar.open('Failed to update education', 'Close', { duration: 3000 });
      }
    });
  }

}