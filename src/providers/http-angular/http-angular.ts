import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpAngularProvider {
  constructor(public http: Http) { }

  public get(url: string, params?: any, options: any = {}) {
    console.log("http-angular-get")
    options.params = params;

    var headers = new Headers();
    headers.append('API_KEY', 'X-some-key');
    let op = new RequestOptions({ headers: headers});


    options.headers = headers;

    //options.withCredentials = true;
    console.log(op);

    return this.http.get(url, op);
  }

  public post(url: string, params: any, options: any = {}) {
    //options.withCredentials = true;

    let body = this.createSearchParams(params);

    return this.http.post(url, body.toString(), options);
  }

  private createSearchParams(params: any) {
    let searchParams = new URLSearchParams();
    for (let k in params) {
      if (params.hasOwnProperty(k)) {
        searchParams.set(k, params[k]);
      }
    }

    return searchParams;
  }
}
