import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './templates/login.component.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  public returnUrl = '/';
  public model: any = {};

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _router: Router,
                     private _user: UserService) {
    this._title.setTitle('Login');
  }

  public ngOnInit() {
    if (localStorage.getItem('currentCandidate')) {
      this._router.navigate(['/profile']);
    }
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public signIn() {
    if (this.model.username && this.model.password) {
      this._loading.show();
      this._user.login(this.model.username, this.model.password).subscribe(
        data => {
          this._loading.hide();
          this._router.navigate([this.returnUrl]);
        },
        error2 => {
          this._alert.error(error2._body);
          this._loading.hide();
        }
      );
    }
  }
}
