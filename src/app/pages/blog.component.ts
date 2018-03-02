import {Component, OnInit} from "@angular/core";
import {BlogService} from "../services/blog.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";

@Component({
  templateUrl: '../templates/blog.component.html',
  providers: [BlogService]
})

export class BlogComponent implements OnInit {
  public blogs: any = {};

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _blog: BlogService) {
    this._title.setTitle('Blogs');
  }

  public ngOnInit() {
    this.getBlogs();
  }

  public getBlogs() {
    this._loading.show();
    this._blog.getBlogs().subscribe(
      data => {
        this.blogs = data;
        this._loading.hide();
      },
      error2 => {
        this._alert.error(error2._body);
        this._loading.hide();
      }
    );
  }
}
