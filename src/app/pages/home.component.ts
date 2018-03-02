import {Component, OnInit} from '@angular/core';
import {JobService} from "../services/job.service";
import {Title} from "@angular/platform-browser";
import {APIConfig} from "../config/api.config";
import {BlogService} from "../services/blog.service";

@Component({
  templateUrl: './templates/home.component.html',
  providers: [JobService, BlogService]
})

export class HomeComponent implements OnInit {
  public employer_register = APIConfig.EMPLOYER_REGISTER;
  public media_url = APIConfig.MEDIA_URL;
  public jobs: any = {
    company: {}
  };
  public blogs: any = {
    results: {},
    post_box: {},
    post_box_small: []
  };
  public categories: any = [];
  public popularCompanies: any = [];
  public newJobs: any = [];

  public constructor(private _title: Title,
                     private _blog: BlogService,
                     private _job: JobService) {
    this._title.setTitle('Home Page');
  }

  public ngOnInit() {
    this.getJobs();
    this.getAllCategories();
    this.getPopularCompanies();
    this.getNewJobs();
    this.getBlog();
  }

  public getJobs() {
    this._job.getAll().subscribe(
      data => {
        this.jobs = data;
      }
    );
  }

  public getAllCategories() {
    this._job.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  public getPopularCompanies() {
    this._job.popularCompanies().subscribe(
      data => {
        this.popularCompanies = data;
      }
    );
  }

  public getNewJobs() {
    this._job.newJobs().subscribe(
      data => {
        this.newJobs = data;
      }
    );
  }

  public getBlog() {
    this._blog.getHotBlogs().subscribe(
      data => {
        for (let index in data.results) {
          if (index == '0') {
            this.blogs.post_box = data.results[index];
          } else {
            this.blogs.post_box_small.push(data.results[index]);
          }
        }
      }
    );
  }
}
