import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { catchError, Observable, of } from 'rxjs';

import metadata from '../../../application-shared/metadata/table-generator/administration-organizations.json';

// TODO: переделать интерфейс после получения бэка. (пока что использую mock для визуализации)
interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number,
    pageSize: number
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`);
    return this.http
      .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columns = metadata;
  value?: string;
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 20;
  pageIndex = 1;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];

  isVisible = false;
  modalTitle = '';
  modalContent = '';

  actions = [
    { name: 'Edit', callback: this.onEdit },
    { name: 'Delete', callback: this.onDelete }
  ];

  constructor(private randomUserService: RandomUserService) {}

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize).subscribe(data => {
      this.loading = false;
      this.total = data.results.length; // update this line
      this.listOfRandomUser = data.results;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  openModal(): void {
    this.isVisible = true;
    this.modalTitle = 'Добавить пользователя';
    this.modalContent = '';
  }

  handleFormSubmit(): void {
    console.log('Form submitted');
    this.isVisible = false;
  }

  handleModalCancel(): void {
    this.isVisible = false;
  }

  onEdit(item: RandomUser): void {
    console.log('Edit action', item);
    // todo logic
  }

  onDelete(item: RandomUser): void {
    console.log('Delete action', item);
    // todo logic
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    console.log(this.columns);
  }
}