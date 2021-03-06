import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentCandidate')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
