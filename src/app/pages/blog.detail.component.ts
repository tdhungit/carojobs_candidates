import {Component, OnDestroy, OnInit} from "@angular/core";
import {BlogService} from "../services/blog.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './templates/blog.detail.component.html',
  providers: [BlogService]
})

export class BlogDetailComponent implements OnInit, OnDestroy {
  private sub: any;

  public blog_id: number;
  public blog: any = {};

  public constructor(private _title: Title,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _blog: BlogService) {
    this._title.setTitle('Detail: ');
  }

  public ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.blog_id = params['blog_id'];
    });
    this.getBlog();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getBlog() {
    this._loading.show();
    this._blog.getBlog(this.blog_id).subscribe(
      data => {
        this.blog = data;
        this._title.setTitle('Detail: ' + this.blog.name);
        this._loading.hide();
      },
      error2 => {
        this._alert.error(error2._body);
        this._loading.hide();
      }
    );
  }
}
