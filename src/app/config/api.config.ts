import {Headers, RequestOptions} from "@angular/http";
export class APIConfig {
  // dev
  public static API_URL = 'http://127.0.0.1:8000';
  public static MEDIA_URL = 'http://127.0.0.1:8000/statics/media';
  public static EMPLOYER_URL = 'http://localhost:4200';
  public static EMPLOYER_REGISTER = 'http://localhost:4200/pages/register';
  // live
  // public static API_URL = 'http://api.carojobs.com';
  // public static MEDIA_URL = 'http://api.carojobs.com/statics/media';
  // public static EMPLOYER_URL = 'http://employer.carojobs.com';
  // public static EMPLOYER_REGISTER = 'http://employer.carojobs.com/#/pages/register';

  public static client_id = 'carojobs';
  public static client_secret = 'carodev@carojobs';

  public static jwt(multipart = false) {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentCandidate'));
    if (currentUser && currentUser.access_token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.access_token});
      // if (multipart) {
      //   headers.append('Content-Type', 'multipart/form-data');
      // }
      return new RequestOptions({headers: headers});
    }
  }
}
