import { Component, OnInit } from '@angular/core';
import metadata from '../../../metadata/table-generator/organization-history.json';

@Component({
  selector: 'app-organization-history',
  templateUrl: './organization-history.component.html',
  styleUrls: ['./organization-history.component.scss']
})
export class OrganizationHistoryComponent implements OnInit {
  columns = metadata;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
