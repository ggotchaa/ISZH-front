import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {
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

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.updateData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.updateData();
  }

  sortData(sort: { key: string, value: string }): void {
    const data = [...this.data];
    if (sort.key && sort.value) {
      this.data = data.sort((a, b) =>
        sort.value === 'ascend'
          ? this.getValue(a, sort.key) > this.getValue(b, sort.key) ? 1 : -1
          : this.getValue(b, sort.key) > this.getValue(a, sort.key) ? 1 : -1
      );
    } else {
      this.data = data;
    }
    this.updateData();
  }

  updateData(): void {
    this.data = this.data.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize);
  }
}
