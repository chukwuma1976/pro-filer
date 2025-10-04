import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { NavContainerComponent } from './component/nav-container/nav-container.component';
import { UserResumesComponent } from './component/user-resumes/user-resumes.component';
import { AllResumesComponent } from './component/all-resumes/all-resumes.component';
import { ResumeFormComponent } from './component/resume-form/resume-form.component';
import { LoginGuard } from './guards/login.guard';
import { ResumeEditFormComponent } from './component/resume-edit-form/resume-edit-form.component';
import { ViewResumeComponent } from './component/view-resume/view-resume.component';
import { ExperienceFormComponent } from './component/experience-form/experience-form.component';
import { ExperienceEditFormComponent } from './component/experience-edit-form/experience-edit-form.component';
import { EducationFormComponent } from './component/education-form/education-form.component';
import { EducationEditFormComponent } from './component/education-edit-form/education-edit-form.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { GuestGuard } from './guards/guest.guard';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: 'pro-filer',
        component: NavContainerComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'home', component: HomePageComponent },
            { path: 'resume-details', component: UserResumesComponent },
            { path: 'all-resumes', component: AllResumesComponent },
            { path: 'resume-form', component: ResumeFormComponent },
            { path: 'edit-resume/:id', component: ResumeEditFormComponent },
            { path: 'view-resume/:id', component: ViewResumeComponent },
            { path: 'add-experience/:resumeId', component: ExperienceFormComponent },
            { path: 'edit-experience/:resumeId/:id', component: ExperienceEditFormComponent },
            { path: 'add-education/:resumeId', component: EducationFormComponent },
            { path: 'edit-education/:resumeId/:id', component: EducationEditFormComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
