import {Component, OnInit} from "@angular/core";
import {ResumeService} from "../services/resume.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";

@Component({
  templateUrl: './templates/resume.list.component.html',
  providers: [ResumeService]
})

export class ResumeListComponent implements OnInit {
  public currentPage = 1;
  public model: any = {};

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _resume: ResumeService) {
    this._title.setTitle('Resumes');
  }

  public ngOnInit() {
    this._loading.show();
    this.getResumes();
  }

  public getResumes() {
    this._resume.getList(this.currentPage).subscribe(
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
    this.getResumes();
  }
}
