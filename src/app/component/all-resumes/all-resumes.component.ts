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
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';

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
    MatBadgeModule
  ],
  templateUrl: './all-resumes.component.html',
  styleUrl: './all-resumes.component.scss'
})
export class AllResumesComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);

  resumes: Resume[] = []; // Initialize resumes as an empty array
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'summary', 'action']; // Define the columns to display
  dataSource: MatTableDataSource<Resume> = new MatTableDataSource<Resume>([]);

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  viewResumeMessage = 'View the details of this resume.';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.getAllResumes().subscribe(resumes => {
      this.resumes = resumes
      this.dataSource = new MatTableDataSource<Resume>(this.resumes);
    }); // Fetch all resumes from the service
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
