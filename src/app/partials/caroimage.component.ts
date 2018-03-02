import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {APIConfig} from "../config/api.config";

@Component({
  selector: 'caroimage',
  template: `<img [src]="image_url" [class]="cssClass" [alt]="title">`
})

export class CaroImageComponent implements OnInit, OnChanges {
  @Input() uri = '';
  @Input() alt = 'assets/img/tmp/airbnb.png';
  @Input() cssClass = '';
  @Input() title = '';

  public media_url = APIConfig.MEDIA_URL;
  public image_url;

  public constructor() {}

  public ngOnInit() {

  }

  public ngOnChanges() {
    this.generateData();
  }

  public generateData() {
    if (this.uri && this.uri.length > 2) {
      if (this.uri.indexOf('http://') >= 0 || this.uri.indexOf('https://') >= 0) {
        this.image_url = this.uri;
      } else {
        this.image_url = this.media_url + this.uri;
      }
    } else {
      this.image_url = this.alt;
    }
  }
}
