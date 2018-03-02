import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from "../services/job.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: './templates/jobs.component.html',
  providers: [JobService, UserService]
})

export class JobsComponent implements OnInit, OnDestroy {
  private sub1: any;
  private sub2: any;

  public currentPage = 1;
  public model: any = {};
  public my_jobs: any = [];
  public search = {
    slug: '',
    keyword: '',
    salary_min: '',
    salary_max: '',
    types: [],
    locations: [],
    status: [],
  };

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _user: UserService,
                     private _job: JobService) {
    this._title.setTitle('Jobs');
  }

  public ngOnInit() {
    this.sub1 = this._route.params.subscribe(params => {
      this.search.slug = params['slug'];
    });

    this.sub2 = this._route.queryParams.subscribe(params => {
      if (params['q']) this.search.keyword = params['q'];
      if (params['smin']) this.search.salary_min = params['smin'];
      if (params['smax']) this.search.salary_max = params['smax'];
      if (params['types']) this.search.types = params['types'];
      if (params['locations']) this.search.locations = params['locations'];
      if (params['status']) this.search.status = params['status'];
    });
    this.getJobs();
    this.getMyJobs();
  }

  public ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  public getJobs() {
    this._loading.show();
    this._job.getAll(this.currentPage, this.search).subscribe(
      data => {
        this.model = data;
        this._loading.hide();
      },
      error2 => {
        this._alert.error(error2._body);
        this._loading.hide();
      }
    );
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
    this.getJobs();
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
}
