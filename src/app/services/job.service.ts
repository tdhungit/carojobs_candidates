import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {APIConfig} from "../config/api.config";
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {
  public constructor(private _http: Http) {}

  public getAllCategories() {
    return this._http.get(APIConfig.API_URL + '/pub/jobs/categories/')
      .map((response: Response) => response.json());
  }

  public getAll(page = 1, search: any = {}) {
    let limit = 20;
    let url = APIConfig.API_URL + '/pub/jobs/?format=json';
    // generate params search
    url += '&category__slug=' + search.slug;
    url += '&q=' + search.keyword;
    url += '&smin=' + search.salary_min;
    url += '&smax=' + search.salary_max;

    for (let key in search.types)
      url += '&types[]=' + search.types[key];

    for (let key in search.locations)
      url += '&locations[]=' + search.locations[key];

    for (let key in search.status)
      url += '&status[]=' + search.status[key];

    // generate param page
    if (page > 1) {
      url += '&limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url).map((response: Response) => response.json());
  }

  public getById(job_id: number) {
    return this._http.get(APIConfig.API_URL + '/pub/jobs/' + job_id + '/')
      .map((response: Response) => response.json());
  }

  public getCompanyById(company_id: number) {
    return this._http.get(APIConfig.API_URL + '/companies/' + company_id + '/')
      .map((response: Response) => response.json());
  }

  public getCompanyJobs(company_id: number, page = 1) {
    let limit = 20;
    let url = APIConfig.API_URL + '/pub/jobs/' + company_id + '/company-jobs/';
    if (page > 1) {
      url += '?limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url).map((response: Response) => response.json());
  }

  public popularCompanies() {
    return this._http.get(APIConfig.API_URL + '/pub/jobs/popular-companies/')
      .map((response: Response) => response.json());
  }

  public newJobs() {
    return this._http.get(APIConfig.API_URL + '/pub/jobs/new-jobs/')
      .map((response: Response) => response.json());
  }

  public getOpenJobCompanies(page = 1) {
    let limit = 20;
    let url = APIConfig.API_URL + '/companies/list-companies/';
    if (page > 1) {
      url += '?limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url).map((response: Response) => response.json());
  }

  public getMyJobs(page = 1, only_id = false) {
    let limit = 20;
    let url = APIConfig.API_URL + '/jobs/my-jobs/';
    // generate param page
    if (page > 1) {
      url += '?limit=' + limit + '&offset=' + (page - 1) * limit;
    } else {
      url += '?limit=1000&offset=0';
    }

    if (only_id == true) {
      url += '&only_id=1';
    } else {
      url += '&only_id=0';
    }

    return this._http.get(url, APIConfig.jwt()).map((response: Response) => response.json());
  }

  public saveJob(job_id) {
    return this._http.get(APIConfig.API_URL + '/candidates/save-job/?job_id=' + job_id, APIConfig.jwt())
      .map((response: Response) => response.json());
  }
}
