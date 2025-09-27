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
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from '../../services/utility.service';

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
  users: User[] = []; // Initialize a list of users to grab usernames
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'template', 'summary', 'action']; // Define the columns to display
  dataSource: MatTableDataSource<Resume> = new MatTableDataSource<Resume>([]);

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position: FormControl = new FormControl(this.positionOptions[2]);
  viewResumeMessage: string = 'View the details of this resume.';
  cloneResumeMessage: string = 'Clone this resume.';
  deleteResumeMessage: string = 'Delete this resume.';
  isLoading = true; // Flag to indicate loading state
  currentUserId!: string | number;

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

  constructor(
    private resumeService: ResumeService,
    private userService: UserService,
    private dialog: MatDialog,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.currentUserId = UserService.userId;
    this.userService.getAllUsers().subscribe(users => this.users = users);
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

  getUsername(id: string | number) {
    return this.users.find(user => user.id === id)?.username;
  }

  deepCloneWithoutId<T>(obj: T): T {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepCloneWithoutId(item)) as unknown as T;
    }

    if (typeof obj === 'object') {
      const cloned: any = {};
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (key === 'id') continue; // skip all 'id' fields
        cloned[key] = this.deepCloneWithoutId((obj as any)[key]);
      }
      return cloned;
    }

    // primitive value
    return obj;
  }

  cloneResume(resume: Resume) {
    console.log('Cloning resume:', resume);
    // Deep clone resume and remove all IDs
    const clonedResume: Resume = this.deepCloneWithoutId(resume);

    // Prepend clone info to summary
    clonedResume.summary = `Cloned from Resume ID: ${resume.id} for User ID ${resume.userId}. ` + (clonedResume.summary || '');

    // Persist via backend
    this.resumeService.addResume(clonedResume, this.currentUserId)
      .subscribe(newResume => {
        this.resumes.unshift(newResume);
        this.dataSource.data = this.resumes;
        this.util.openSnackBar('Resume cloned successfully!', 'Close');
      });
  }

  openDeleteDialog(resumeId: number | string) {
    const resume = this.resumes.find(r => r.id === resumeId);
    const dialogRef = this.util.openDeleteDialog(this.dialog, resume!);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // Remove the deleted resume from the array
        this.resumes = this.resumes.filter(r => r.id !== resumeId);
        this.dataSource.data = this.resumes;
      }
    });
  }

}
