import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'loading',
  template: '<div *ngIf="loading" style="position:fixed;width:100%;top:0;background:#FFFFFF;z-index:10;text-align:center">' +
  '<img src="assets/img/loading.gif" height="64px"></div>'
})

export class LoadingComponent implements OnInit {
  public loading = false;

  public constructor(private _loading: LoadingService) {}

  public ngOnInit() {
    this._loading._loading.subscribe((status: boolean) => {
      this.loading = status;
    });
  }
}
