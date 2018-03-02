import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {APIConfig} from "../config/api.config";

@Injectable()
export class BlogService {
  public constructor(private _http: Http) {}

  public getCategories() {
    return this._http.get(APIConfig.API_URL + '/pub/blog/categories/')
      .map((response: Response) => response.json());
  }

  public getCategory(id: number) {
    return this._http.get(APIConfig.API_URL + '/pub/blog/category/' + id + '/')
      .map((response: Response) => response.json());
  }

  public getBlogs() {
    return this._http.get(APIConfig.API_URL + '/pub/blog/')
      .map((response: Response) => response.json());
  }

  public getHotBlogs() {
    return this._http.get(APIConfig.API_URL + '/pub/blog/hot-blog/?limit=4')
      .map((response: Response) => response.json());
  }

  public getBlog(id: number) {
    return this._http.get(APIConfig.API_URL + '/pub/blog/' + id + '/')
      .map((response: Response) => response.json());
  }
}
