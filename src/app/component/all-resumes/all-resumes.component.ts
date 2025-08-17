import { Component, inject, ViewChild } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../shared/models/resume';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-all-resumes',
  imports: [
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './all-resumes.component.html',
  styleUrl: './all-resumes.component.scss'
})
export class AllResumesComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);

  resumes: Resume[] = []; // Initialize resumes as an empty array
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'template', 'summary', 'action']; // Define the columns to display
  dataSource: MatTableDataSource<Resume> = new MatTableDataSource<Resume>([]);

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  viewResumeMessage = 'View the details of this resume.';
  isLoading = true; // Flag to indicate loading state

  @ViewChild(MatPaginator, { static: false }) //set paginator for dynamically loaded data
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false }) //set sort for dynamically loaded data
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.getAllResumes().subscribe(resumes => {
      this.resumes = resumes
      this.dataSource = new MatTableDataSource<Resume>(this.resumes);
      this.isLoading = false; // Set loading to false after fetching resumes
    }); // Fetch all resumes from the service
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
