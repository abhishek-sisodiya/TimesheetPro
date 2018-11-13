import { Component, OnInit } from '@angular/core';
import { jsonContentService } from "../service/general.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private _jsonContentService: jsonContentService) { }

  ngOnInit() {
    this.getContentJSON();
  }

  contentGeneral: any;
  WelcomeUser;
  getContentJSON() {
    this._jsonContentService.getJsonContent().subscribe(data => {
      this.contentGeneral = data;
      this.WelcomeUser = this.contentGeneral.UserName;
    }, // Bind to view
      err => {
        // Log errors if any
        console.log('error: ', err);
      });
  }

  menuClick(event) {
    this._jsonContentService.menuItemValue(event.target.innerText);
  }

}
