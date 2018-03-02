import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {APIConfig} from "../config/api.config";
import {Router} from "@angular/router";

@Component({
  templateUrl: './templates/profile.edit.component.html',
  providers: [UserService]
})

export class ProfileEditComponent implements OnInit {
  public model: any = {
    user: {}
  };

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _router: Router,
                     private _user: UserService) {
    this._title.setTitle('Change My Profile');
  }

  public ngOnInit() {
    this.getProfile();
  }

  public getProfile() {
    this._loading.show();
    this._user.profile().subscribe(
      data => {
        this.model = data;
        this.model.avatar_path = APIConfig.MEDIA_URL + this.model.avatar;
        this._title.setTitle(this.model.user.username);
        this._loading.hide();
      },
      error2 => {
        this._alert.error_check(error2);
        this._loading.hide();
      }
    );
  }

  public save() {
    this._loading.show();
    this._user.updateProfile(this.model).subscribe(
      data => {
        this._router.navigate(['/profile']);
        this._loading.hide();
      },
      error2 => {
        this._alert.error_check(error2);
        this._loading.hide();
      }
    );
  }
}
