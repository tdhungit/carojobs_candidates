import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {APIConfig} from "../config/api.config";
import 'rxjs/add/operator/map';

@Injectable()
export class CandidateService {
  public constructor(private _http: Http) {}

  public create(model: any) {
    return this._http.post(APIConfig.API_URL + '/candidates/', model)
      .map((response: Response) => response.json());
  }
}
