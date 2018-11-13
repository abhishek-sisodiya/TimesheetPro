import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class jsonContentService {
  // MenuItem:string;

  constructor(private httpClient: HttpClient) { }
  getJsonContent() {
    return this.httpClient.get("./assets/json/data.json");
    // return this.dashboardList;
  }
}