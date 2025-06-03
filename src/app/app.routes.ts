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
import { loginGuard } from './guards/login.guard';
import { ResumeEditFormComponent } from './component/resume-edit-form/resume-edit-form.component';
import { ViewResumeComponent } from './view-resume/view-resume.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
        path: 'pro-filer',
        component: NavContainerComponent,
        canActivate: [loginGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent },
            { path: 'resume-details', component: UserResumesComponent },
            { path: 'all-resumes', component: AllResumesComponent },
            { path: 'resume-form', component: ResumeFormComponent },
            { path: 'edit-resume/:id', component: ResumeEditFormComponent },
            { path: 'view-resume/:id', component: ViewResumeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
