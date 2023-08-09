import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { catchError, Observable, of } from 'rxjs';
import { AdministrationService } from 'src/app/services/administration.service';

import metadata from '../../../application-shared/metadata/table-generator/administration-users.json';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor (private administraionService: AdministrationService) {}
  columns = metadata;

  userList: any
  userListFiltered: any;

  value?: string;
  total = 1;
  loading = true;
  pageSize = 20;
  pageIndex = 1;
  isVisibleFilter = false;
  isVisible = false;
  modalTitle = '';
  modalContent = '';

  actions = [
    { name: 'Edit', callback: this.onEdit },
    { name: 'Delete', callback: this.onDelete }
  ];

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    //this.loadDataFromServer(pageIndex, pageSize);
  }

  openModal(): void {
    this.isVisible = true;
    this.modalTitle = 'Добавить пользователя';
    this.modalContent = '';
  }
  showModalFilter(): void {
    this.isVisibleFilter = true;
  }

  showModalSetting(): void {
    // this.isVisibleSetting = true;
  }

  handleFormSubmit(): void {
    console.log('Form submitted');
    this.isVisible = false;
  }

  handleModalCancel(): void {
    this.isVisible = false;
  }

  onEdit(): void {
    console.log('Edit action');
    // todo logic
  }

  onDelete(): void {
    console.log('Delete action');
    // todo logic
  }

  getList() {
    this.loading = true;
    this.administraionService
      .getUserList(this.userListFiltered)
      .subscribe((res) => {
        this.userList = res.body.lists;
        this.total = res.body.count;
        this.loading = false;
        // this.filterList();
      });
  }

  ngOnInit(): void {
    //this.loadDataFromServer(this.pageIndex, this.pageSize);
    console.log(this.columns);
  }
}
