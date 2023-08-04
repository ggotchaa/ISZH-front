import {Component, Injectable} from '@angular/core';
import metadata from "../application-shared/metadata/table-generator/administration-organizations.json";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

interface RandomUser {
  name: string,
  code: string,
  value: number;
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
  selector: 'app-roles-accesses',
  templateUrl: './roles-accesses.component.html',
  styleUrls: ['./roles-accesses.component.scss']
})
export class RolesAccessesComponent {
  columns = metadata;
  value?: string;
  total = 1;
  listOfRandomUser: RandomUser[]=[];
  loading = true;
  pageSize = 20;
  pageIndex = 1;
  isVisibleFilter = false;

  //region: Add Organization Modal
  isVisible = false;
  modalTitle = 'Добавить Организацию';

  showModalFilter(): void {
    this.isVisibleFilter = true;
  }

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

  handleFormSubmitHistory(): void {
    console.log('Form submitted');
    this.isVisible = false;
  }
  //endregion

  //region: Deleting Modal
  isVisibleDeletingModal = false;
  modalTitleDelete = 'Удаление';

  openDeleteModal(item: RandomUser): void {
    this.isVisibleDeletingModal = true;
    this.modalTitle = this.modalTitleDelete;
    console.log('Deleting action', item)
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

  // region: View Organization Modal
  isVisibleViewModal = false;
  modalTitleView = 'Просмотр';

  openViewModal(item: RandomUser): void {
    this.isVisibleEditModal = true;
    this.modalTitle = this.modalTitleEdit;
    console.log('View action', item);
  }
  //endregion
  constructor(private randomUserService: RandomUserService) {}

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize).subscribe(data => {
      this.loading = false;
      this.total = data.results.length;
      this.listOfRandomUser = data.results;
    });
  }
  ConfigureActionColumn = [
    { name: 'Просмотр', callback: this.openViewModal },
    { name: 'Редактировать', callback: this.openEditModal },
    { name: 'Удалить', callback: this.openDeleteModal },
    { name: 'История', callback: this.openHistoryModal }
  ];

  onActionClick(event: {item: RandomUser, action: string}): void {
    switch(event.action) {
      case 'Просмотр':
        this.openViewModal(event.item);
        break;
      case 'Редактировать':
        this.openEditModal(event.item);
        break;
      case 'Удалить':
        this.openDeleteModal(event.item);
        break;
      case 'История':
        this.openHistoryModal(event.item);
        break;
      default:
        console.log('Invalid action');
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize);
  }
  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    console.log(this.columns);
  }
  showModalSetting(): void {
    // this.isVisibleSetting = true;
  }
  handleModalCancel(): void {
    this.isVisible = false;
  }
}
