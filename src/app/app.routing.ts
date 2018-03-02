import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from "./pages/home.component";
import {AboutComponent} from "./pages/about.component";
import {LoginComponent} from "./pages/login.component";
import {RegisterComponent} from "./pages/register.component";
import {CompaniesComponent} from "./pages/companies.component";
import {CompanyDetailComponent} from "./pages/company.detail.component";
import {JobsComponent} from "./pages/jobs.component";
import {JobDetailComponent} from "./pages/job.detail.component";
import {ResumeCreateComponent} from "./pages/resume.create.component";
import {ProfileComponent} from "./pages/profile.component";
import {AuthGuard} from "./services/auth.guard";
import {ResumeListComponent} from "./pages/resume.list.component";
import {ResumeDetailComponent} from "./pages/resume.detail.component";
import {ResumeEditComponent} from "./pages/resume.edit.component";
import {SaveJobComponent} from "./pages/savejob.component";
import {ProfileEditComponent} from "./pages/profile.edit.component";
import {ProfileJobsComponent} from "./pages/profile.jobs.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'company-detail/:company_id', component: CompanyDetailComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'jobs/:slug', component: JobsComponent},
  {path: 'job-detail/:job_id', component: JobDetailComponent},
  {path: 'job-save/:job_id', component: SaveJobComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile-jobs', component: ProfileJobsComponent, canActivate: [AuthGuard]},
  {path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'create-resume', component: ResumeCreateComponent, canActivate: [AuthGuard]},
  {path: 'resumes', component: ResumeListComponent, canActivate: [AuthGuard]},
  {path: 'resume-detail/:resume_id', component: ResumeDetailComponent, canActivate: [AuthGuard]},
  {path: 'resume-edit/:resume_id', component: ResumeEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
