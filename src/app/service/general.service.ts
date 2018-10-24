import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Headers } from '@angular/http';
import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import 'rxjs/Rx';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class jsonContentService {

  constructor(private httpClient: HttpClient) { }
  getJsonContent() {
    return this.httpClient.get("./assets/json/data.json");
    // return this.dashboardList;
  }
}