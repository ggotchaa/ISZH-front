import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-animal-registry-table',
  templateUrl: './animal-registry-table.component.html',
  styleUrls: ['./animal-registry-table.component.scss']
})
export class AnimalRegistryTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string, title: string, sort?: boolean, filter?: boolean }[] = [];
  @Input() actions: { name: string, callback: (item: any) => void }[] = [];
  @Output() queryChange = new EventEmitter<NzTableQueryParams>();
  @Output() actionClick = new EventEmitter<{item: any, action: string}>();
  pageIndex: number = 1;
  pageSize: number = 10;
  sort: any;
  filter: any;
  selectedRow: any;

  constructor(private elementRef: ElementRef) {
    this.getValue = this.getValue.bind(this);
  }

  getValue(data: any, key: string): any {
    return key.split('.').reduce((o, k) => o[k], data);
  }

  onQueryParamsChange(pageIndex: number, pageSize: number, sort: any, filter: any): void {
    const queryParams: NzTableQueryParams = {
      pageIndex,
      pageSize,
      sort,
      filter
    };
    this.queryChange.emit(queryParams);
  }

  toggleSelectedRow(row: any): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  executeAction(action: { name: string, callback: (item: any) => void }, item: any): void {
    this.selectedRow = item;
    this.actionClick.emit({item: item, action: action.name});
  }


  ngOnInit(): void {
  }

  filterData(value: string, item: any): boolean {
    return item === (value === 'true');
  }
}
