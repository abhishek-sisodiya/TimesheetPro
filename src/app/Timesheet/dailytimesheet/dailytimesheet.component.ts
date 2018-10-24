import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { jsonContentService } from "../../service/general.service"
@Component({
  selector: 'app-dailytimesheet',
  templateUrl: './dailytimesheet.component.html',
  styleUrls: ['./dailytimesheet.component.css'],
})
export class DailytimesheetComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private _jsonContentService: jsonContentService) { }


  ngOnInit() {
    //modified code

    this.containers[this.ControlIndex] = true;
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
     var d = new Date(); /*
    this.SelectedDate = d; */
    let day = d.getDate();
    let month = d.getMonth() + 1;
    this.year = d.getFullYear();
    this.SelectedDate = [day, month, this.year].join('/');
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
      this.IsJiraOn[index] = false;
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
      return false;
    }

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


  closeTask(event) {
    let x = 0;
    for (let i = 0; i < this.containers.length; i++) {
      if (this.containers[i] == true) {
        x++;
      }
    }
    if (x > 1) {
      this.containers[event] = false;
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
    delete this.TotalHours;
  }


  cancelClick() {
    // this.containers = [];
    // delete this.TotalHours;
    alert('Location.back()');
  }


  hoursClick(event, index) {
    if (this.HrsWorkedArray[index] != undefined || this.HrsWorkedArray[index] != '') {
      this.HrsClass[index] = true;
    }


    // console.log(index);

    /* this.HoursArray[index] = event.data;
  
    var result = 0;
    for (var i = 0; i < this.HoursArray.length; i++) {
      result += this.HoursArray[i];
    }
    console.log(result); */

    this.TotalHours = event.data;
  }

  commentClick(index) {
    if (this.CommentsArray[index] != undefined || this.CommentsArray[index] != '' || this.CommentsArray.length != 0) {
      this.TextAreaClass[index] = true;
    }
  }

  saveClick() {
    let count = 0;
    this.ObjectCollection = [];

    console.log(this.containers);


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

    if (count == 0) {
      for (let i: number = 0; i < this.containers.length; i++) {
        if (this.containers[i] == true) {
          this.item = {}
          this.item["SeqNumber"] = i;
          this.item["Project"] = this.ProjectArray[i];
          this.item["Module"] = this.ModuleArray[i];
          this.item["Object"] = this.ObjectArray[i];
          this.item["Activity"] = this.ActivityArray[i];
          if (this.JIRANumberArray[i] != undefined) {
            this.item["JIRAno"] = this.JIRANumberArray[i];
          }
          this.item["Comments"] = this.CommentsArray[i];
          this.item["HrsWorked"] = this.HrsWorkedArray[i];
          this.ObjectCollection[i] = this.item;
          this.openSnackBar('Timesheet Successfully Saved ', '');
        }
      }
    }
    else {
      this.openSnackBar('Please Fill Values -->', 'For Red Areas');
    }
    // console.log(this.ObjectCollection);  
    var filtered = this.ObjectCollection.filter(function (el) {
      return el != null;
    });

    console.log(filtered);
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
    console.log(event.target.innerHTML);
    
    this.SelectedDate = event.target.innerHTML;
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
      this.datesArray = this.contentGeneral.Dates;
      this.IraName = this.contentGeneral.IraName;
      console.log(this.contentGeneral);
      console.log(this.datesArray);
      

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
