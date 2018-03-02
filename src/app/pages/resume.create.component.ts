import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";
import {APIConfig} from "../config/api.config";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ResumeService} from "../services/resume.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './templates/resume.create.component.html',
  providers: [UserService, ResumeService]
})

export class ResumeCreateComponent {
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
                     private _router: Router,
                     private _resume: ResumeService,
                     private _user: UserService) {
    this._title.setTitle('Create Resume');
  }

  public uploadAvatar(image: any) {
    let listImages = image.target.files;
    if (listImages.length > 0) {
      let file: File = listImages[0];
      this._user.upload(file).subscribe(
        data => {
          this.model.avatar = data.uri;
          this.model.avatar_path = APIConfig.MEDIA_URL + data.uri;
        }
      );
    }
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

  public create() {
    this._loading.show();
    this._resume.create(this.model).subscribe(
      data => {
        this._loading.hide();
        this._alert.success('Create resume success');
        this._router.navigate(['/resume-detail/' + data.id]);
      },
      error2 => {
        this._loading.hide();
        this._alert.error(error2._body);
      }
    );
  }
}
