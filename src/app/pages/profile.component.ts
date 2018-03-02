import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";

@Component({
  templateUrl: './templates/profile.component.html',
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  public model: any = {
    user: {}
  };

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _user: UserService) {
    this._title.setTitle('My Profile');
  }

  public ngOnInit() {
    this.getProfile();
  }

  public getProfile() {
    this._loading.show();
    this._user.profile().subscribe(
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
}
