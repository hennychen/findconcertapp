import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { HttpAngularProvider } from '../http-angular/http-angular';
import { HttpNativeProvider } from '../http-native/http-native';

@Injectable()
export class HttpProvider {
  public http: HttpNativeProvider | HttpAngularProvider;

  constructor(private platform: Platform, private angularHttp: HttpAngularProvider, private nativeHttp: HttpNativeProvider) {
    //this.http = this.platform.is('ios') || this.platform.is('android') ? this.nativeHttp : this.angularHttp;
    this.http = this.angularHttp;
  }

  //constructor(private platform: Platform, private angularHttp: HttpAngularProvider) {
  //  console.log("constructor - http")
  //  this.http = this.angularHttp;
  //}

  public get(url: string, params?: any, options: any = {}) {
    return this.http.get(url, options);
  }
}
