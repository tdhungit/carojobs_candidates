import {Component, OnDestroy, OnInit} from "@angular/core";
import {ResumeService} from "../services/resume.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './templates/resume.detail.component.html',
  providers: [ResumeService]
})

export class ResumeDetailComponent implements OnInit, OnDestroy {
  private sub: any;

  public resume_id: number;
  public model: any = {};
  public skill_skills = [];
  public skill_os = [];
  public skill_lang = [];

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _resume: ResumeService) {
    this._title.setTitle('Detail Resume');
  }

  public ngOnInit() {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.resume_id = params['resume_id'];
    });
    this._resume.getById(this.resume_id).subscribe(
      data => {
        this.model = data;
        this._title.setTitle(this.model.name);
        for (let item of this.model.experienceskill_set) {
          if (item.category == 'Skill') {
            this.skill_skills.push(item);
          } else if (item.category == 'Operation System') {
            this.skill_os.push(item);
          } else {
            this.skill_lang.push(item);
          }
        }
        this._loading.hide();
      },
      error2 => {
        this._alert.error_check(error2);
      }
    );
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
