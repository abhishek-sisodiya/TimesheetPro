import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addmanager',
  templateUrl: './addmanager.component.html',
  styleUrls: ['./addmanager.component.css']
})
export class AddmanagerComponent implements OnInit {

  constructor(private _location: Location, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ShowMInfo = false;
  ClientName = ['DP-DIASPARK1', 'DP-DIASPARK2', 'DP-DIASPARK3', 'DP-DIASPARK4', 'DP-DIASPARK5',];
  ParentProjectName = ['DP-DIASPARK1', 'DP-DIASPARK2', 'DP-DIASPARK3', 'DP-DIASPARK4', 'DP-DIASPARK5',];
  ProjectType = ['Internal', 'Client'];
  ContractType = ['Internal', 'Client'];
  TechnoType = ['.Net', 'Java', 'Angular', 'BI', 'SQL'];
  DivisionType = ['A', 'B', 'C', 'D', 'E'];


  userForm = new FormGroup({
    ClientName: new FormControl,
    TechnoType: new FormControl,
    ParentProjectName: new FormControl,
    ProjectType: new FormControl,
    ContractType: new FormControl,
    DivisionType: new FormControl,
    ProjectCode: new FormControl(),
    ProjectName: new FormControl(),
    ProjectOwner: new FormControl(),
    AccountManager: new FormControl(),
    EstimationPd: new FormControl(),
    TsStartDate: new FormControl(),
    StartDate: new FormControl(),
    EndDate: new FormControl(),
    ParentActive: new FormControl(),
  });




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cancelClick() {
    this._location.back();
  }

  ObjectCollection;
  onFormSubmit(event) {
    this.ShowMInfo = true;
    this.ObjectCollection = event;
    console.log(this.ObjectCollection);
    this.openSnackBar('Successfully Submitted', '');
  }

}
