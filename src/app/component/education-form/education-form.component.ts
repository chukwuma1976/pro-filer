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
import { DEGREE_OPTIONS, TOOL_TIP_MESSAGES } from '../../shared/constants';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STATES_DROPDOWN } from '../../shared/constants';
import { Observable } from 'rxjs';
import { EducationService } from '../../services/education.service';
import { Education } from '../../shared/models/education';

@Component({
  selector: 'app-education-form',
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
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
  providers: [...provideNativeDateAdapter()]
})
export class EducationFormComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  educationForm: FormGroup;
  newEducation!: Education;
  resumeId!: number | string;
  protected _snackBar = inject(MatSnackBar);
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  ifCurrentlyEmployedMessage = TOOL_TIP_MESSAGES.ifCurrentlyEmployed;
  stateWillBeAbbreviatedMessage = TOOL_TIP_MESSAGES.stateWillBeAbbreviated;

  stateOptions = STATES_DROPDOWN;
  degreeOptions = DEGREE_OPTIONS;
  filteredStateOptions!: Observable<any[]>;
  filteredDegreeOptions!: Observable<any[]>;

  constructor(protected fb: FormBuilder, protected educationService: EducationService, protected router: Router, protected route: ActivatedRoute) {
    this.educationForm = this.fb.group({
      institution: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      graduationDate: ['', Validators.required],
      descriptionEdu: [''],
      awards: this.fb.array([]),
    });
    this.manageEducationStateFilter();
    this.manageEducationDegreeFilter()

  }

  ngOnInit() {
    this.resumeId = this.route.snapshot.paramMap.get('resumeId') ?? '';
  }

  onSubmit() {
    this.newEducation = this.educationForm.value as Education;
    this.newEducation.graduationDate = (this.newEducation.graduationDate instanceof Date)
      ? this.processPresentAsEndDate(this.newEducation.graduationDate)
      : this.newEducation.graduationDate;

    this.educationService.addEducationByResumeId(this.resumeId, this.newEducation).subscribe(data => console.log(data));
    this.educationForm.reset();
    this.formGroupDirective.resetForm();
    this.openSnackBar('Education submitted successfully!', 'Close');
    this.goBackToEditResume() // Redirect to the education form with the resumeId  
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  manageEducationStateFilter() {
    const stateValue = this.educationForm.get('state')?.value;
    if (stateValue !== undefined) {
      // If you want to filter based on the current state value:
      this.filteredStateOptions = new Observable<any[]>(observer => {
        observer.next(this._filter(stateValue || '', this.stateOptions));
      });
    }
  }

  manageEducationDegreeFilter() {
    const degreeValue = this.educationForm.get('degree')?.value;
    if (degreeValue !== undefined) {
      // If you want to filter based on the current degree value:
      this.filteredDegreeOptions = new Observable<any[]>(observer => {
        observer.next(this._filter(degreeValue || '', this.degreeOptions));
      });
    }
  }

  protected _filter(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  get descriptions(): FormArray {
    return this.educationForm.get('description') as FormArray;
  }

  addDescription() {
    this.descriptions.push(this.fb.control('', Validators.required));
  }

  removeDescription(descriptionIndex: number) {
    this.descriptions.removeAt(descriptionIndex);
    this.educationForm.markAsDirty();
  }

  processPresentAsEndDate(endDate: Date): string | Date {
    const currentDate = new Date();
    const yearIsEqual = endDate.getFullYear() === currentDate.getFullYear();
    const monthIsEqual = endDate.getMonth() === currentDate.getMonth();
    const dayIsEqual = endDate.getDate() === currentDate.getDate();
    if (yearIsEqual && monthIsEqual && dayIsEqual) return 'present';
    return endDate;
  }

  getAwards(): FormArray {
    return this.educationForm.get('awards') as FormArray;
  }
  addAward() {
    this.getAwards().push(this.fb.control('', Validators.required));
  }
  removeAward(awardIndex: number) {
    this.getAwards().removeAt(awardIndex);
    this.educationForm.markAsDirty();
  }

  goBackToEditResume() {
    this.router.navigate(['/pro-filer/edit-resume', this.resumeId]);
  }
}
