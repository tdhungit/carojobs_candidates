import {Component, OnInit} from '@angular/core';
import {JobService} from "../services/job.service";
import {Title} from "@angular/platform-browser";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";

@Component({
  templateUrl: './templates/companies.component.html',
  providers: [JobService]
})

export class CompaniesComponent implements OnInit {
  public currentPage = 1;
  public model: any = [];
  public newJobs: any = [];

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _job: JobService) {
    this._title.setTitle('Companies');
  }

  public ngOnInit() {
    this.getCompanies();
    this._job.newJobs().subscribe(
      data => {
        this.newJobs = data;
      }
    );
  }

  public getCompanies() {
    this._loading.show();
    this._job.getOpenJobCompanies(this.currentPage).subscribe(
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

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getCompanies();
  }
}
