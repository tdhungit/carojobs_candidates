import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {PaginationConfig, PaginationModule} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app.routing";

import {HomeComponent} from "./pages/home.component";
import {AboutComponent} from "./pages/about.component";
import {HeaderTopComponent} from "./partials/header.top.component";
import {LoginComponent} from "./pages/login.component";
import {RegisterComponent} from "./pages/register.component";
import {LoadingService} from "./services/loading.service";
import {LoadingComponent} from "./partials/loading.component";
import {AlertService} from "./services/alert.service";
import {AlertComponent} from "./partials/alert.component";
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
import {CaroImageComponent} from "./partials/caroimage.component";
import {SaveJobComponent} from "./pages/savejob.component";
import {ProfileEditComponent} from "./pages/profile.edit.component";
import {ProfileJobsComponent} from "./pages/profile.jobs.component";
import {TruncatePipe} from "./pipes/truncate.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderTopComponent,
    LoadingComponent,
    AlertComponent,
    CaroImageComponent,
    TruncatePipe,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileJobsComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    JobsComponent,
    JobDetailComponent,
    SaveJobComponent,
    ResumeCreateComponent,
    ResumeListComponent,
    ResumeDetailComponent,
    ResumeEditComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    PaginationModule
  ],
  exports: [
    TruncatePipe
  ],
  providers: [
    LoadingService,
    AlertService,
    AuthGuard,
    PaginationConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
