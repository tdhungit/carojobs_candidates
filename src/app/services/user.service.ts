import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {APIConfig} from "../config/api.config";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  public constructor(private _http: Http) {}

  public isLogin() {
    if (localStorage.getItem('currentCandidate')) {
      return true;
    }
    return false;
  }

  public login(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = 'grant_type=password&client_id=' + APIConfig.client_id + '&client_secret=' + APIConfig.client_secret
      + '&username=' + username + '&password=' + password;
    return this._http.post(APIConfig.API_URL + '/auth/token/', body, {headers: headers})
      .map((response: Response) => {
        let user = response.json();
        if (user && user.access_token) {
          localStorage.setItem('currentCandidate', JSON.stringify(user));
        }
      });
  }

  public upload(file) {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this._http.post(APIConfig.API_URL + '/users/upload/', formData)
      .map((response: Response) => response.json());
  }

  public profile() {
    return this._http.get(APIConfig.API_URL + '/candidates/profile/', APIConfig.jwt())
      .map((response: Response) => response.json());
  }

  public updateProfile(model: any) {
    return this._http.put(APIConfig.API_URL + '/candidates/update_profile/', model, APIConfig.jwt())
      .map((response: Response) => response.json());
  }
}
