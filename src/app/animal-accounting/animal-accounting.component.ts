import {Component, Injectable, Input} from '@angular/core';
import {NzFormatEmitEvent} from "ng-zorro-antd/tree";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import animalRegistryTable from "../animal-registry-table/table-generator/animal-registry.json"
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

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
  selector: 'app-animal-accounting',
  templateUrl: './animal-accounting.component.html',
  styleUrls: ['./animal-accounting.component.scss']
})
export class AnimalAccountingComponent {
  isVisibleSetting = false;
  isVisible = false;
  selectedValue = null;
  date = null;
  modalTitle = 'Фильтры';
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  columns = animalRegistryTable;


  actions = [
    { name: 'Edit', callback: this.onEdit },
    { name: 'Delete', callback: this.onDelete },
    { name: 'Изменить', callback: this.openEditModal }
  ];


  constructor(private randomUserService: RandomUserService) {
  }


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
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  showModalSetting(): void {
    this.isVisibleSetting = true;
  }

  handleOk(): void {
    this.isVisibleSetting = false;
  }

  handleCancel(): void {
    this.isVisibleSetting = false;
  }

  showModalFilter(): void {
    this.isVisible = true;
  }
  handleFormSubmit(): void {
    console.log('Form submitted');
    this.isVisible = false;
  }

  handleModalCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    console.log(this.columns);
  }

  onEdit(item: RandomUser): void {
    console.log('Edit action', item);
    // todo logic
  }

  onDelete(item: RandomUser): void {
    console.log('Delete action', item);
    // todo logic
  }

  openEditModal(): void {
    this.isVisible = true;
    this.modalTitle;
  }
  searchValue = '';

  nodes = [
    {
      title: 'Акмолинская область',
      key: 'Акмолинская область',
      isLeaf: true
    },
    {
      title: 'Актюбинская область',
      key: 'Актюбинская область',
      isLeaf: true
    },
    {
      title: 'Алматинская область',
      key: 'Алматинская область',
      isLeaf: true
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}
