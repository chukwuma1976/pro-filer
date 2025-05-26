import { Component } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../shared/models/resume';
import { ResumeDetailsComponent } from '../component/resume-details/resume-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-resume',
  imports: [ResumeDetailsComponent, MatIconModule, MatButtonModule],
  templateUrl: './view-resume.component.html',
  styleUrl: './view-resume.component.scss'
})
export class ViewResumeComponent {

  resume: Resume | undefined;
  constructor(private resumeService: ResumeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const resumeId = this.route.snapshot.paramMap.get('id');
    this.resume = resumeId ? this.resumeService.getResumeById(resumeId) : undefined;
  }

  goBack() {
    this.router.navigate(['/pro-filer/all-resumes']);
  }

}
