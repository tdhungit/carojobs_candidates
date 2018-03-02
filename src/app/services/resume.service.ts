import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {APIConfig} from "../config/api.config";
import 'rxjs/add/operator/map';

@Injectable()
export class ResumeService {
  public constructor(private _http: Http) {}

  public create(model: any) {
    return this._http.post(APIConfig.API_URL + '/resumes/', model, APIConfig.jwt())
      .map((response: Response) => response.json());
  }

  public getById(resume_id: number) {
    return this._http.get(APIConfig.API_URL + '/resumes/' + resume_id + '/', APIConfig.jwt())
      .map((response: Response) => response.json());
  }

  public update(resume_id: number, model: any) {
    return this._http.put(APIConfig.API_URL + '/resumes/' + resume_id + '/', model, APIConfig.jwt())
      .map((response: Response) => response.json());
  }

  public getList(page = 1) {
    let limit = 20;
    let url = APIConfig.API_URL + '/resumes/';
    if (page > 1) {
      url += '?limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url, APIConfig.jwt()).map((response: Response) => response.json());
  }
}
