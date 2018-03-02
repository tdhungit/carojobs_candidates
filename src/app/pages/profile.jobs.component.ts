import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {JobService} from "../services/job.service";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";

@Component({
  templateUrl: './templates/profile.jobs.component.html',
  providers: [JobService]
})

export class ProfileJobsComponent implements OnInit {
  public model: any = {};
  public currentPage = 1;

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _job: JobService) {
    this._title.setTitle('My Jobs');
  }

  public ngOnInit() {
    this.getMyJobs();
  }

  public getMyJobs() {
    this._loading.show();
    this._job.getMyJobs(this.currentPage, false).subscribe(
      data => {
        this.model = data;
        this._loading.hide();
      },
      error2 => {
        this._alert.error_check(error2);
        this._loading.hide();
      }
    );
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getMyJobs();
  }
}
