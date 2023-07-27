import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-organization-form',
  templateUrl: './add-organization-form.component.html',
  styleUrls: ['./add-organization-form.component.scss']
})
export class AddOrganizationFormComponent implements OnInit{

  date = null;
  selectedValue = null;
  isBlocked = false;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  blockBtn(): void {
    this.isBlocked = !this.isBlocked;
    console.log("Заблокировано -" + this.isBlocked)
  }

  ngOnInit(): void {
    console.log('AddOrganizationFormComponent');
  }
}
