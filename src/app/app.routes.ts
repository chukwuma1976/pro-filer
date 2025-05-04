import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavContainerComponent } from './nav-container/nav-container.component';
import { UserResumesComponent } from './user-resumes/user-resumes.component';
import { AllResumesComponent } from './all-resumes/all-resumes.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
        path: 'pro-filer', component: NavContainerComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePageComponent },
            { path: 'resume-details', component: UserResumesComponent },
            { path: 'all-resumes', component: AllResumesComponent },
            { path: 'resume-form', component: ResumeFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
