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

@Component({
  selector: 'app-experience-form',
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
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class ExperienceFormComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  experienceForm: FormGroup;
  newExperience!: Experience;
  resumeId!: number | string;
  protected _snackBar = inject(MatSnackBar);
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  ifCurrentlyEmployedMessage = TOOL_TIP_MESSAGES.ifCurrentlyEmployed;
  stateWillBeAbbreviatedMessage = TOOL_TIP_MESSAGES.stateWillBeAbbreviated;

  stateOptions = STATES_DROPDOWN
  filteredStateOptionsExp!: Observable<any[]>;

  constructor(protected fb: FormBuilder, protected experienceService: ExperienceService, protected router: Router, private route: ActivatedRoute) {
    this.experienceForm = this.fb.group({
      employer: ['', Validators.required],
      title: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      startDate: ['', [Validators.required, customDateValidator()]],
      endDate: [new Date(), [Validators.required, customDateValidator()]],
      description: this.fb.array([this.fb.control('', Validators.required)]),
    });

  }

  ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('resumeId') ?? '';
  }

  onSubmit() {
    this.newExperience = this.experienceForm.value as Experience;
    this.newExperience.endDate = (this.newExperience.endDate instanceof Date)
      ? this.processPresentAsEndDate(this.newExperience.endDate)
      : this.newExperience.endDate;

    this.experienceService.addExperienceByResumeId(this.resumeId, this.newExperience).subscribe(data => console.log(data));
    this.experienceForm.reset();
    this.formGroupDirective.resetForm();
    this.openSnackBar('Experience submitted successfully!', 'Close');
    this.goBackToEditResume() // Redirect to the experience form with the resumeId  
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  manageExperienceStateFilter(i: number) {
    const stateValue = this.newExperience.state;
    if (stateValue !== undefined) {
      // If you want to filter based on the current state value:
      this.filteredStateOptionsExp = new Observable<any[]>(observer => {
        observer.next(this._filter(stateValue || '', this.stateOptions));
      });
    }
  }

  protected _filter(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  get descriptions(): FormArray {
    return this.experienceForm.get('description') as FormArray;
  }

  addDescription() {
    this.descriptions.push(this.fb.control('', Validators.required));
  }

  removeDescription(descriptionIndex: number) {
    this.descriptions.removeAt(descriptionIndex);
    this.experienceForm.markAsDirty();
  }

  processPresentAsEndDate(endDate: Date): string | Date {
    const currentDate = new Date();
    const yearIsEqual = endDate.getFullYear() === currentDate.getFullYear();
    const monthIsEqual = endDate.getMonth() === currentDate.getMonth();
    const dayIsEqual = endDate.getDate() === currentDate.getDate();
    if (yearIsEqual && monthIsEqual && dayIsEqual) return 'present';
    return endDate;
  }

  goBackToEditResume() {
    this.router.navigate(['/pro-filer/edit-resume', this.resumeId]);
  }
}
