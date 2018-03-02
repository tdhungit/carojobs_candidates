import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {JobService} from "../services/job.service";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: './templates/company.detail.component.html',
  providers: [JobService, UserService]
})

export class CompanyDetailComponent implements OnInit, OnDestroy {
  private sub: any;

  public currentPage = 1;
  public company_id: number;
  public model: any = {};
  public jobs: any = {};
  public my_jobs: any = [];

  public constructor(private _title: Title,
                     private _route: ActivatedRoute,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _user: UserService,
                     private _job: JobService) {
    this._title.setTitle('Company Detail')
  }

  public ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.company_id = params['company_id'];
    });
    this._job.getCompanyById(this.company_id).subscribe(
      data => {
        this.model = data;
        this._title.setTitle(this.model.name);
        this._loading.hide();
      },
      error2 => {
        this._alert.error(error2._body);
        this._loading.hide();
      }
    );
    this.getCompanyJobs();
    this.getMyJobs();
  }

  public getCompanyJobs() {
    this._job.getCompanyJobs(this.company_id, this.currentPage).subscribe(data => {this.jobs = data;});
  }

  public getMyJobs() {
    if (this._user.isLogin()) {
      this._job.getMyJobs(0, true).subscribe(
        data => {
          this.my_jobs = data;
        }
      );
    }
  }

  public isSaved(job_id) {
    for (let item of this.my_jobs) {
      if (item.id == job_id) {
        return true;
      }
    }
    return false;
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getCompanyJobs();
  }

  public saveJob(job_id) {
    this._loading.show();
    this._job.saveJob(job_id).subscribe(
      data => {
        this.my_jobs.push(data);
        this._loading.hide();
      },
      error2 => {
        this._alert.error_check(error2);
        this._loading.hide();
      }
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
