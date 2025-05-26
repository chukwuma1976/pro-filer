import { Component, ViewChild } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../shared/models/resume';
import { NgFor, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResumeDetailsComponent } from "../../component/resume-details/resume-details.component"; // Corrected path to ResumeDetailsComponent
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-resumes',
  imports: [MatExpansionModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatButtonModule, MatIconModule, RouterLink], // Import NgFor for ngFor directive
  templateUrl: './all-resumes.component.html',
  styleUrl: './all-resumes.component.scss'
})
export class AllResumesComponent {
  resumes: Resume[] = []; // Initialize resumes as an empty array
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'summary', 'action']; // Define the columns to display
  dataSource: MatTableDataSource<Resume> = new MatTableDataSource<Resume>([]);

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  viewResumeMessage = 'View the details of this resume.';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumes = this.resumeService.getAllResumes(); // Fetch all resumes from the service
    this.dataSource = new MatTableDataSource<Resume>(this.resumes);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
