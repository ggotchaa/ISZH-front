import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-users-form',
  templateUrl: './add-users-form.component.html',
  styleUrls: ['./add-users-form.component.scss']
})
export class AddUsersFormComponent implements OnInit{
  isDisabledButton:any;
  isCheckedButton: any;
  isPhysUser:any;
  isJuridUser: any;
  birthDate: any;
  endRoleDate: any;
  startRoleDate: any;
  iin:any;
  lastName:any;
  firstName:any;
  middleName:any;
  email:any;
  mobile:any;
  docNumber:any;
  docGetDate:any;
  docGetBy:any;
  kato:any;
  country:any;
  mailIndex:any;
  streetName:any;
  houseNumber:any;
  flatNumber:any;
  organization:any;
  system:any;
  role:any;
  rights:any;
  contract:any;

  ngOnInit(): void {
    console.log('AddUsersFormComponent');
  }
}