import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-organization-form',
  templateUrl: './add-organization-form.component.html',
  styleUrls: ['./add-organization-form.component.scss']
})
export class AddOrganizationFormComponent implements OnInit{

  date = null;
  selectedValue = null;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  ngOnInit(): void {
    console.log('AddOrganizationFormComponent');
  }
 
}