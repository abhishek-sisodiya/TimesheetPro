import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class jsonContentService {
  MenuItem: string;

  constructor(private httpClient: HttpClient,  private router: Router) { }
  getJsonContent() {
    return this.httpClient.get("./assets/json/data.json");
    // return this.dashboardList;
  }

  menuItemValue(val: string) {
    this.MenuItem = val;    
  }
}