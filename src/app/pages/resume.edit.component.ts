import {Component, OnDestroy, OnInit} from "@angular/core";
import {ResumeService} from "../services/resume.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {APIConfig} from "../config/api.config";

@Component({
  templateUrl: './templates/resume.edit.component.html',
  providers: [ResumeService]
})

export class ResumeEditComponent implements OnInit, OnDestroy {
  private sub: any;

  public resume_id: number;
  public model: any = {
    experience: [],
    education: [],
    skill: []
  };
  public experience: any = {};
  public education: any = {};
  public skill: any = {};

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _router: Router,
                     private _resume: ResumeService) {
    this._title.setTitle('Edit Resume');
  }

  public ngOnInit() {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.resume_id = params['resume_id'];
    });
    this._resume.getById(this.resume_id).subscribe(
      data => {
        this.model = data;
        this.model.avatar_path = APIConfig.MEDIA_URL + this.model.avatar;
        this.model.skill = data.experienceskill_set;
        this.model.experience = data.experience_set;
        this.model.education = data.education_set;
        this._title.setTitle('Edit: ' + this.model.name)
        this._loading.hide();
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

  public addSkill() {
    if (this.skill.hasOwnProperty('name')
      && this.skill.hasOwnProperty('category')
      && this.skill.hasOwnProperty('experience')) {
      this.model.skill.push(this.skill);
      this.skill = {};
    }
  }

  public addExperience() {
    if (this.experience.hasOwnProperty('name')
      && this.experience.hasOwnProperty('date_start') && this.experience.hasOwnProperty('date_end')
      && this.experience.hasOwnProperty('description')) {
      this.model.experience.push(this.experience);
      this.experience = {};
    }
  }

  public addEducation() {
    if (this.education.hasOwnProperty('name')
      && this.education.hasOwnProperty('date_start') && this.education.hasOwnProperty('date_end')
      && this.education.hasOwnProperty('description')) {
      this.model.education.push(this.education);
      this.education = {};
    }
  }

  public update() {
    this._loading.show();
    this._resume.update(this.resume_id, this.model).subscribe(
      data => {
        this._alert.success('Success: ' + data.name);
        this._loading.hide();
        this._router.navigate(['/resume-detail/' + this.resume_id]);
      },
      error2 => {
        this._alert.error_check(error2);
        this._loading.hide();
      }
    );
  }
}
