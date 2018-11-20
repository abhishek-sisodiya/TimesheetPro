import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheetmanager',
  templateUrl: './timesheetmanager.component.html',
  styleUrls: ['./timesheetmanager.component.css']
})
export class TimesheetmanagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    fetch('https://api.myjson.com/bins/15psn9')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }

  columnDefs = [
    { headerName: 'ProjectCode', field: 'make' },
    { headerName: 'ClientCode', field: 'model' },
    { headerName: 'ProjectName', field: 'make' },
    { headerName: 'ParentProjectCode', field: 'model' },
    { headerName: 'TechnologyID', field: 'make' },
    { headerName: 'ProjectType', field: 'model' },
    { headerName: 'EffortsEstimatedinPD', field: 'make' },
    { headerName: 'StartDate', field: 'model' },
    { headerName: 'EndDate', field: 'make' },
    { headerName: 'AccountManagerEmployeeCode', field: 'model' },
  ];

  rowData = [

  ];

  addClick() {
    this.router.navigate(['add-manager-sheet']);
  }

}
