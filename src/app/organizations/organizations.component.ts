import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { catchError, Observable, of } from 'rxjs';

import metadata from '../application-shared/metadata/table-generator/administration-organizations.json';

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
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
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
  
  //region: Add Organization Modal
  isVisible = false;
  modalTitle = 'Добавить Организацию';

  openModal(): void {
    this.isVisible = true;
    this.modalTitle;
  }

  handleFormSubmit(): void {
    console.log('Form submitted');
    this.isVisible = false;
  }
  //endregion

  //region: History Modal
  isVisibleHistoryModal = false;
  modalTitleHistory = 'История';

  openHistoryModal(item: RandomUser): void {
    this.isVisibleHistoryModal = true;
    this.modalTitle = this.modalTitleHistory;
    console.log('History action', item);
  }
  //endregion

  //region: Edit Organization Modal
  isVisibleEditModal = false;
  modalTitleEdit = 'Редактировать Организацию';

  openEditModal(item: RandomUser): void {
    this.isVisibleEditModal = true;
    this.modalTitle = this.modalTitleEdit;
    console.log('Edit action', item);
  }
  //endregion

  ConfigureActionColumn = [
    { name: 'Редактировать', callback: this.openEditModal },
    { name: 'Удалить', callback: this.onDeleteModal },
    { name: 'История', callback: this.openHistoryModal }
  ];

  onActionClick(event: {item: RandomUser, action: string}): void {
    switch(event.action) {
      case 'Редактировать':
        this.openEditModal(event.item);
        break;
      case 'Удалить':
        this.onDeleteModal(event.item);
        break;
      case 'История':
        this.openHistoryModal(event.item);
        break;
      default:
        console.log('Invalid action');
    }
  }

  constructor(private randomUserService: RandomUserService) {}

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize).subscribe(data => {
      this.loading = false;
      this.total = data.results.length; 
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

  handleModalCancel(): void {
    this.isVisible = false;
  }

  onDeleteModal(item: RandomUser): void {
    console.log('Delete action', item);
    // todo logic
  }
  

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    console.log(this.columns);
  }
}
