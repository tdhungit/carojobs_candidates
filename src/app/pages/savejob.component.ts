import {Component, OnDestroy, OnInit} from "@angular/core";
import {JobService} from "../services/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";

@Component({
  template: `<loading></loading>`,
  providers: [JobService]
})

export class SaveJobComponent implements OnInit, OnDestroy {
  private sub: any;
  private job_id: number;
  private returnUrl: string;

  public constructor(private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _router: Router,
                     private _job: JobService) {}

  public ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this.sub = this._route.params.subscribe(params => {
      this.job_id = params['job_id'];
    });
    this.saveJob();
  }

  public saveJob() {
    this._loading.show();
    this._job.saveJob(this.job_id).subscribe(
      data => {
        this._loading.hide();
        this._router.navigate([this.returnUrl]);
      },
      error2 => {
        this._alert.error_check(error2);
        this._loading.hide();
      }
    );
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
