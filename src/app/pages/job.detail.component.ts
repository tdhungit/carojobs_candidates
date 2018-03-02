import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {JobService} from "../services/job.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";

@Component({
  templateUrl: './templates/job.detail.component.html',
  providers: [JobService]
})

export class JobDetailComponent implements OnInit, OnDestroy {
  private sub: any;

  public job_id: number;
  public model: any = {
    location: {},
    company: {}
  };

  public constructor(private _title: Title,
                     private _route: ActivatedRoute,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _job: JobService) {
    this._title.setTitle('Job Detail');
  }

  public ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.job_id = params['job_id'];
    });
    this._job.getById(this.job_id).subscribe(
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
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
