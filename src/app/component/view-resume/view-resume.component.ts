import { Component } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../shared/models/resume';
import { ResumeDetailsComponent } from '../resume-details/resume-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UtilityService } from '../../services/utility.service';
import { ResumeToolHeaderComponent } from '../resume-tool-header/resume-tool-header.component';

@Component({
  selector: 'app-view-resume',
  imports: [ResumeDetailsComponent, MatIconModule, MatButtonModule, ResumeToolHeaderComponent],
  templateUrl: './view-resume.component.html',
  styleUrl: './view-resume.component.scss'
})
export class ViewResumeComponent {

  resume: Resume | undefined;
  constructor(
    private resumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilityService) { }

  ngOnInit() {
    const resumeId = this.route.snapshot.paramMap.get('id') ?? '0';
    this.resumeService.getResumeById(resumeId).subscribe(resume => this.resume = this.util.processResume(resume));
  }

  goBack() {
    this.router.navigate(['/pro-filer/all-resumes']);
  }

}
