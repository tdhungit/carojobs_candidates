import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";
import {APIConfig} from "../config/api.config";
import {CandidateService} from "../services/candidate.service";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './templates/register.component.html',
  providers: [UserService, CandidateService]
})

export class RegisterComponent {
  public employer_register = APIConfig.EMPLOYER_REGISTER;
  public model: any = {
    user: {}
  };

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _router: Router,
                     private _user: UserService,
                     private _candidate: CandidateService) {
    this._title.setTitle('Register');
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

  public removeAvatar() {

  }

  public signUp() {
    if (this.model.user.password == this.model.user.password_confirm) {
      this._loading.show();
      this._candidate.create(this.model).subscribe(
        data => {
          this._loading.hide();
          this._alert.success('Register is successful');
          this._router.navigate(['/login']);
        },
        error2 => {
          this._alert.error(error2._body);
          this._loading.hide();
        }
      );
    }
  }
}
