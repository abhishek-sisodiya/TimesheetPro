import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { jsonContentService } from "../../service/general.service"
import { empty } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-nonworksheet',
  templateUrl: './nonworksheet.component.html',
  styleUrls: ['./nonworksheet.component.css']
})
export class NonworksheetComponent implements OnInit {

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar, private _jsonContentService: jsonContentService) { }


  ngOnInit() {
    //modified code
    this.IsJiraOn[this.ControlIndex] = true;
    this.ProjectClass[this.ControlIndex] = true;
    this.ModuleClass[this.ControlIndex] = true;
    this.ObjectClass[this.ControlIndex] = true;
    this.ActivityClass[this.ControlIndex] = true;
    this.HrsClass[this.ControlIndex] = true;
    this.TextAreaClass[this.ControlIndex] = true;

    this.locations = [
      { name: "Bangalore" },
      { name: "Indore" },
      { name: "Other" },
      { name: "Pune" },
      { name: "USA" },
    ]
    this.DefaultLocation = this.locations[1].name;
    this.getContentJSON();
    var d = new Date();
    this.SelectedDate = d;
    let day = d.getDate();
    let month = d.getMonth() + 1;
    this.year = d.getFullYear();
    // this.SelectedDate = [day, month, this.year].join('/');
  }
  year;
  DefaultLocation;
  IsJiraOn = [];
  containers = [];
  ControlIndex = 0;
  HoursArray = [];
  TotalHours;
  x;
  ProjectArray = [];
  ModuleArray = [];
  ObjectArray = [];
  ActivityArray = [];
  JIRANumberArray = [];
  CommentsArray = [];
  HrsWorkedArray = [];
  ObjectCollection = [];
  item = {};
  // selectedProject;
  locations = [];
  ProjectClass = [];
  ModuleClass = [];
  ObjectClass = [];
  ActivityClass = [];
  HrsClass = [];
  TextAreaClass = [];

  projects = [
    { name: "--Select--" },
    { name: "Undeployed" },
  ]

  releases = [
    { name: "--Select--" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
  ]


  modules = [
    { name: "--Select--" }
  ]

  objects = [
    { name: "--Select--" }
  ]

  activitys = [
    { name: "--Select--" },
    { name: "Client Bug Fixing" },
    { name: "Code Review" },
    { name: "Communication" },
    { name: "Data Updation" },
    { name: "Deployement" },
    { name: "Design" },
    { name: "Design Review" },
    { name: "Development" },
    { name: "Discussion" },
    { name: "Documentation" },
    { name: "Internal Bug Fixing" },
    { name: "Interview" },
    { name: "Management" },
    { name: "Meeting" },
    { name: "Monitoring And Control" },
    { name: "On Leave" },
    { name: "Other Review" },
    { name: "Planning" },
    { name: "POC" },
    { name: "Pre Sales" },
    { name: "Project Coordination" },
    { name: "R&D" },
    { name: "Release" },
    { name: "Requirement" },
    { name: "ReWork" },
    { name: "Support" },
    { name: "Test Case Creation" },
    { name: "Test Case Review" },
    { name: "Testing" },
    { name: "Training" },
  ]


  projectClick(event, index) {
    this.ProjectArray[index] = event.value;
    if (event.value != '--Select--') {
      this.ProjectClass[index] = true;
    }

    if (event.value == 'Undeployed') {
      // this.IsJiraOn[index] = false;
      this.modules = [
        { name: '--Select--' },
        { name: 'Appraisal' },
        { name: 'KT' },
        { name: 'NPA' },
        { name: 'Organisational' },
        { name: 'Self Assigned' },
        { name: 'Support' },
      ]
    }
    if (event.value == '--Select--') {
      this.IsJiraOn[index] = true;
      this.modules = [
        { name: "--Select--" }
      ]
      this.objects = [
        { name: "--Select--" }
      ]
    }
  }

  moduleClick(event, index) {
    this.ModuleArray[index] = event.value;
    if (event.value != '--Select--') {
      this.ModuleClass[index] = true;
    }

    if (event.value == '--Select--') {
      this.objects = [
        { name: "--Select--" }
      ]
    }
    else if (event.value == 'Appraisal' || event.value == 'KT') {
      this.objects = [
        { name: "--Select--" },
        { name: "Meeting" }
      ]
    }
    else if (event.value == 'NPA') {
      this.objects = [
        { name: "--Select--" },
        { name: "Documentation" }
      ]
    }
    else if (event.value == 'Organisational') {
      this.objects = [
        { name: "--Select--" },
        { name: "Holiday" },
        { name: "Interview" },
        { name: "Meeting" },
        { name: "POC" },
        { name: "Pre-Sales" },
        { name: "R&D" },
        { name: "Training" },
        { name: "Training (As Trainer)" }
      ]
    }
    else if (event.value == 'Self Assigned') {
      this.objects = [
        { name: "--Select--" },
        { name: "Doing R&D" },
        { name: "Leave" }
      ]
    }
    else if (event.value == 'Support') {
      this.objects = [
        { name: "--Select--" },
        { name: "Support Activity" },
      ]
    }
  }

  objectClick(event, index) {
    this.ObjectArray[index] = event.value;
    if (event.value != '--Select--') {
      this.ObjectClass[index] = true;
    }
  }

  activityClick(event, index) {
    this.ActivityArray[index] = event.value;
    if (event.value != '--Select--') {
      this.ActivityClass[index] = true;
    }
  }

  addNewTask() {
    let count = 0

    for (let i: number = 0; i < this.containers.length; i++) {
      if (this.containers[i] == true) {

        if (this.HrsWorkedArray[i] == undefined || this.HrsWorkedArray[i] == '') {
          this.HrsClass[i] = false;
          count++;
        }
        else {
          this.HrsClass[i] = true;
        }

        if (this.CommentsArray[i] == undefined || this.CommentsArray[i] == '' || this.CommentsArray.length == 0) {
          this.TextAreaClass[i] = false;
          count++;
        }
        else {
          this.TextAreaClass[i] = true;
        }

        if (this.ProjectArray.length == 0 || this.ProjectArray[i] == '--Select--' || this.ProjectArray[i] == '' || this.ProjectArray[i] == undefined) {
          this.ProjectClass[i] = false;
          count++;
        }
        else {
          this.ProjectClass[i] = true;
        }

        if (this.ModuleArray.length == 0 || this.ModuleArray[i] == '--Select--' || this.ModuleArray[i] == '' || this.ModuleArray[i] == undefined) {
          this.ModuleClass[i] = false;
          count++;
        }
        else {
          this.ModuleClass[i] = true;
        }

        if (this.ObjectArray.length == 0 || this.ObjectArray[i] == '--Select--' || this.ObjectArray[i] == '' || this.ObjectArray[i] == undefined) {
          this.ObjectClass[i] = false;
          count++;
        }
        else {
          this.ObjectClass[i] = true;
        }

        if (this.ActivityArray.length == 0 || this.ActivityArray[i] == '--Select--' || this.ActivityArray[i] == '' || this.ActivityArray[i] == undefined) {
          this.ActivityClass[i] = false;
          count++;
        }
        else {
          this.ActivityClass[i] = true;
        }
      }
    }


    if (count > 0) {
      this.openSnackBar('Please Fill Values -->', 'For Red Areas');
      return false;
    }

    if (this.TotalHours == 12) {
      this.openSnackBar1('You have already completed max hours', '');
    }
    else {
      this.ControlIndex++;
      this.containers[this.ControlIndex] = true;
      this.IsJiraOn[this.ControlIndex] = true;
      this.ProjectClass[this.ControlIndex] = true;
      this.ModuleClass[this.ControlIndex] = true;
      this.ObjectClass[this.ControlIndex] = true;
      this.ActivityClass[this.ControlIndex] = true;
      this.HrsClass[this.ControlIndex] = true;
      this.TextAreaClass[this.ControlIndex] = true;
    }
  }


  closeTask(event) {
    console.log(this.HrsWorkedArray);
    // console.log(this.HoursArray);

    let x = 0;
    for (let i = 0; i < this.containers.length; i++) {
      if (this.containers[i] == true) {
        x++;
      }
    }
    if (x > 1) {
      this.containers[event] = false;
      this.ProjectArray[event] = '--Select--';
      this.ModuleArray[event] = '--Select--';
      this.ObjectArray[event] = '--Select--';
      this.ActivityArray[event] = '--Select--';
      this.CommentsArray[event] = '';
      this.HrsWorkedArray[event] = '';
      this.totalTimeCalc(0, event);
      return false;
    }
    else {
      this.ProjectArray[event] = '--Select--';
      this.ModuleArray[event] = '--Select--';
      this.ObjectArray[event] = '--Select--';
      this.ActivityArray[event] = '--Select--';
      this.CommentsArray[event] = '';
      this.HrsWorkedArray[event] = '';
      return false;
    }


    /*     if (event == 0) {
          return false;
        }
        else {
          this.containers[event] = false;
        } */
  }


  cancelClick() {
    // this.containers = [];
    // delete this.TotalHours;
    alert('Location.back()');
  }

  count = 0;
  hoursClick(event, index) {
    if (this.HrsWorkedArray[index] != undefined || this.HrsWorkedArray[index] != '') {
      this.HrsClass[index] = true;
    }

    // console.log(index);
    /* if(this.itemx.length > 2){
      return false; 
    } */
    // console.log(event);

    if (event.data == null) {
      this.HoursArray = [];
      this.HrsWorkedArray[index] = '';
      this.TotalHours = 0;
      // result = 0;
    }

    /*   if (this.HoursArray.length > 1) {
        this.HoursArray = [];
        this.count = 0;
      }
      this.HoursArray[this.count++] = event.data; */
    // console.log(this.HoursArray);

    /* var result = 0;
    for (var i = 0; i < this.HoursArray.length; i++) {
      result += this.HoursArray[i];
    } */
    // console.log(result);
    if (this.HrsWorkedArray[index] > 12) {
      this.openSnackBar1('Please enter Time <= max time(12)', '');

      this.HoursArray = [];
      this.HrsWorkedArray[index] = '';
      this.count = 0;
    }


    /*     if (result != NaN) {
          this.TotalHours = result;
        } */
  }


  hoursFocusOut(event, index) {
    this.totalTimeCalc(event.target.value, index);
  }

  FocusOutValue = [];
  totalTimeCalc(event, index) {
    // console.log(index);
    // console.log(this.FocusOutValue);
    this.TotalHours = 0;
    this.FocusOutValue[index] = event;
    if (this.HrsWorkedArray[index] == 0) {
      // this.openSnackBar1('Hours cannot be 0', '');
      this.HrsWorkedArray[index] = '';
    }
    for (let i = 0; i < this.FocusOutValue.length; i++) {
      if (this.FocusOutValue[i] != NaN) {
        this.TotalHours += +this.FocusOutValue[i];
      }
    }
    if (this.TotalHours > 12) {
      this.openSnackBar1('Your total Time is > max time(12)', '');
      this.TotalHours = 0;
      this.HrsWorkedArray[index] = '';
    }
  }



  openSnackBar1(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }



  commentClick(index) {
    if (this.CommentsArray[index] != undefined || this.CommentsArray[index] != '' || this.CommentsArray.length != 0) {
      this.TextAreaClass[index] = true;
    }
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  httpOptions: any;
  submitClick(event) {
    
    let count = 0;
    this.ObjectCollection = [];

    // console.log(this.containers);

    for (let i: number = 0; i < this.containers.length; i++) {
      if (this.containers[i] == true) {

        if (this.JIRANumberArray[i] != undefined) {
          var myarray = this.JIRANumberArray[i].split(',');
          if (myarray.length > 1 && this.HrsWorkedArray[i] > 4) {
            count++;
            alert("more than 4 hours is not allowed for more than one jira. Please split it in multiple task");
          }
        }

        if (this.HrsWorkedArray[i] == undefined || this.HrsWorkedArray[i] == '') {
          this.HrsClass[i] = false;
          count++;
        }
        else {
          this.HrsClass[i] = true;
        }

        if (this.CommentsArray[i] == undefined || this.CommentsArray[i] == '' || this.CommentsArray.length == 0) {
          this.TextAreaClass[i] = false;
          count++;
        }
        else {
          this.TextAreaClass[i] = true;
        }

        if (this.ProjectArray.length == 0 || this.ProjectArray[i] == '--Select--' || this.ProjectArray[i] == '' || this.ProjectArray[i] == undefined) {
          this.ProjectClass[i] = false;
          count++;
        }
        else {
          this.ProjectClass[i] = true;
        }

        if (this.ModuleArray.length == 0 || this.ModuleArray[i] == '--Select--' || this.ModuleArray[i] == '' || this.ModuleArray[i] == undefined) {
          this.ModuleClass[i] = false;
          count++;
        }
        else {
          this.ModuleClass[i] = true;
        }

        if (this.ObjectArray.length == 0 || this.ObjectArray[i] == '--Select--' || this.ObjectArray[i] == '' || this.ObjectArray[i] == undefined) {
          this.ObjectClass[i] = false;
          count++;
        }
        else {
          this.ObjectClass[i] = true;
        }

        if (this.ActivityArray.length == 0 || this.ActivityArray[i] == '--Select--' || this.ActivityArray[i] == '' || this.ActivityArray[i] == undefined) {
          this.ActivityClass[i] = false;
          count++;
        }
        else {
          this.ActivityClass[i] = true;
        }
      }
    }

    if (count == 0) {
      for (let i: number = 0; i < this.containers.length; i++) {
        if (this.containers[i] == true) {
          this.item = {}
          // this.item["SeqNumber"] = i;
          this.item["TimesheetDetailID"] = 201 + i;
          this.item["TimesheetID"] = 9;
          this.item["ProjectCode"] = this.ProjectArray[i];
          this.item["ModuleID"] = this.ModuleArray[i];
          this.item["ObjectID"] = this.ObjectArray[i];
          this.item["ActivityID"] = this.ActivityArray[i];
          if (this.JIRANumberArray[i] != undefined) {
            this.item["JIRANumber"] = this.JIRANumberArray[i];
          }
          this.item["Comment"] = this.CommentsArray[i];
          this.item["HoursSpent"] = this.HrsWorkedArray[i];
          this.item["TimesheetDate"] = this.SelectedDate;
          this.item["EntryDate"] = this.SelectedDate;
          this.ObjectCollection[i] = this.item;
          // this.ObjectCollection[i + 1] = this.SelectedDate;

          this.datesArray[i] = undefined;
          this.datesArray = this.datesArray.filter(function (el) {
            return el != null;
          });
          // console.log(this.datesArray);

          this.openSnackBar('Timesheet Successfully Saved ', '');
          // this.getContentJSON();
        }
      }


      // console.log(this.ObjectCollection);  
      var filtered = this.ObjectCollection.filter(function (el) {
        return el != null;
      });

      console.log(filtered);

      this.httpOptions = new HttpHeaders({
        /* 'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Origin': '*', */
        'Content-Type': 'application/json; charset=utf-8',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Content-Type, Accept, Pragma, Cache-Control, Authorization,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers" ,
        // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
      });

      for (let i = 0; i < this.ObjectCollection.length; i++) {
        let data = JSON.stringify(this.ObjectCollection[i]);
        // console.log(data[i]);

        this.httpClient.post('http://localhost:50505/api/TimesheetDetails', data, {
          headers: this.httpOptions
        }).subscribe(
          result => { console.log(result); },
          error => { this.handleError(error); },
          () => { });

      }
    } else {
      this.openSnackBar('Please Fill Values -->', 'For Red Areas');
    }

    this.item = {};
    this.item["TimesheetID"] = 113;
    this.item["EmployeeCode"] = '123/456';
    if (event.target.innerText == 'SUBMIT') {
      this.item["IsSubmitted"] = 1;
    } else {
      this.item["IsSaved"] = 1;
    }
    var random = this.item;
    console.log(random);
    
    this.httpOptions = new HttpHeaders({
      /* 'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Origin': '*', */
      'Content-Type': 'application/json; charset=utf-8',
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Content-Type, Accept, Pragma, Cache-Control, Authorization,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers" ,
      // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    });

    let data = JSON.stringify(random);
    // console.log(data[i]);

    this.httpClient.post('http://localhost:50505/api/JustHeader', data, {
      headers: this.httpOptions
    }).subscribe(
      result => { console.log(result); },
      error => { this.handleError(error); },
      () => { });

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  SelectedDate;
  dateClick(event) {
    // this.containers = [];
    // this.ControlIndex = 0;
    // console.log(event.target.innerHTML);

    this.SelectedDate = event.target.innerHTML;
    // this.containers = [];
    this.ProjectArray = [];
    this.ModuleArray = [];
    this.ObjectArray = [];
    this.ActivityArray = [];
    this.CommentsArray = [];
    this.HrsWorkedArray = [];
    this.totalTimeCalc(0, event);
  }

  contentGeneral: any;
  MonthLeft;
  MonthMid;
  MonthRight;
  DayVar;
  MonthVar;
  YearVar;
  datesArray = [];
  IraName;
  getContentJSON() {
    this._jsonContentService.getJsonContent().subscribe(data => {
      this.contentGeneral = data;
      this.MonthLeft = this.contentGeneral.MonthLeft;
      this.MonthMid = this.contentGeneral.MonthMid;
      this.MonthRight = this.contentGeneral.MonthRight;
      for (let i = 0; i < this.contentGeneral.Dates.length; i++) {
        // this.datesArray[i] = this.contentGeneral.Dates[i] + "/" + this.MonthMid + "/" + this.year;
      }
      this.IraName = this.contentGeneral.IraName;
      this.SelectedDate = this.contentGeneral.Dates[0];
      // console.log(this.contentGeneral);
      // console.log(this.datesArray);
      this.SelectedDate = this.datesArray[0];

    }, // Bind to view
      err => {
        // Log errors if any
        console.log('error: ', err);
      });
  }

  // clickOutside() {
  //   if(this.x != undefined){
  //   this.HoursArray.push(this.x);}
  //   console.log(this.HoursArray);

  //   var result = 0;
  //   for (var i = 0; i < this.HoursArray.length; i++) {
  //     result += this.HoursArray[i];
  //   }
  //   console.log(result);


  //   // this.HoursArray.reduce(function (a, b) {
  //   //   console.log(a + b);
  //   // });


  // }



  /*   private _selected: any;
    set selected(src: any) {
      this._selected = src;
      this.selected2 = this._selected.value[0];
    };
    get selected(): any { return this._selected; };
    private selected2: string = "";
    private data: any[] = [
      { "name": "--Select--", "value": ["--Select--"] },
      { "name": "Undeployed", "value": [ 'Appraisel'  ,'KT'  ,'NPA'  ,'Organisational'  ,'Self Support'  ,'Support'  ,] },
    ]; */



}
