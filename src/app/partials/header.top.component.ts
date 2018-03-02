import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: '[headertop]',
  templateUrl: './header.top.component.html',
  providers: [UserService]
})

export class HeaderTopComponent implements OnInit {
  public user: any = {};
  public is_login = false;

  public constructor(private _user: UserService, private _router: Router) {}

  public ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentCandidate'));
    if (currentUser && currentUser.access_token) {
      this._user.profile().subscribe(
        data => {
          this.user = data;
          this.is_login = true;
        },
        error2 => {
          this.is_login = false;
        }
      );
    }
  }

  public logout() {
    localStorage.removeItem('currentCandidate');
    this.is_login = false;
    this._router.navigate(['login']);
  }
}
