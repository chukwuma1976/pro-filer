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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { customDateValidator } from '../../custom-validators/custom-date-validator';
import { TOOL_TIP_MESSAGES } from '../../shared/constants';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STATES_DROPDOWN } from '../../shared/constants';
import { Observable } from 'rxjs';
import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../shared/models/experience';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';

@Component({
  selector: 'app-experience-edit-form',
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
  templateUrl: './experience-edit-form.component.html',
  styleUrl: './experience-edit-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class ExperienceEditFormComponent extends ExperienceFormComponent {
  id!: number | string;
  experience!: Experience;

  constructor(
    fb: FormBuilder,
    experienceService: ExperienceService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super(fb, experienceService, router, route);
  }

  override ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('resumeId') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      this.experienceService.getExperienceById(this.id).subscribe(
        experience => this.populateUpdateForm(experience),
      )
    }
  }

  populateUpdateForm(experience: Experience) {
    this.experienceForm.patchValue({
      id: experience.id,
      employer: experience.employer,
      title: experience.title,
      city: experience.city,
      state: experience.state,
      startDate: experience.startDate,
      endDate: experience.endDate,
    });
    this.experienceForm.setControl('description', this.fb.array(experience.description.map(desc => this.fb.control(desc, Validators.required))));
  }

  onUpdate() {
    this.newExperience = this.experienceForm.getRawValue() as Experience;
    this.newExperience.id = this.id;
    this.newExperience.endDate = (this.newExperience.endDate instanceof Date)
      ? this.processPresentAsEndDate(this.newExperience.endDate)
      : this.newExperience.endDate;

    if (this.experienceForm.valid) {
      this.experienceService.editExperience(this.newExperience).subscribe({
        next: () => {
          this._snackBar.open('Experience updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['pro-filer/edit-resume', this.resumeId]);
        },
        error: (err: any) => {
          console.error('Error updating experience:', err);
          this._snackBar.open('Failed to update experience', 'Close', { duration: 3000 });
        }
      });
    } else {
      this._snackBar.open('Please fill out all required fields', 'Close', { duration: 3000 });
    }
  }

}