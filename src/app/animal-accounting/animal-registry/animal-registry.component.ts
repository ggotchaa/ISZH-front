import {Component, Injectable, Input} from '@angular/core';
import {NzFormatEmitEvent} from "ng-zorro-antd/tree";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import animalRegistryTable from "../../animal-registry-table/table-generator/animal-registry.json"
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

interface Animals {
  name: string;
  cattleCount: number;
  smallCattlesCount: number;
  pigsCount: number;
  horsesCount: number;
  camelsCount: number;
  hoofedsCount: number;
}
@Injectable({ providedIn: 'root' })
export class GetAnimalListService {
  private baseApiUrl = 'http://localhost:5003/';
  private getAnimalListUrl = 'api/registry/api/RegisteredAnimals';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getUsers(pageIndex: number, pageSize: number): Observable<{ results: Animals[] }> {
    const culture = 'Ru'; // Replace this with the appropriate culture ('Ru' or 'En')
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('culture', culture);

    return this.http.get<{ results: Animals[] }>(`${this.baseApiUrl}${this.getAnimalListUrl}`, { params });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-animal-registry',
  templateUrl: './animal-registry.component.html',
  styleUrls: ['./animal-registry.component.scss']
})
export class AnimalRegistryComponent {
  isVisibleSetting = false;
  isVisible = false;
  selectedValue = null;
  date = null;
  modalTitle = 'Фильтры';
  total = 1;
  pageSize = 20;
  pageIndex = 1;
  listOfData: Animals[] = [];
  loading = true;
  columns = animalRegistryTable;


  actions = [
    { name: 'Edit', callback: this.onEdit },
    { name: 'Delete', callback: this.onDelete },
    { name: 'Изменить', callback: this.openEditModal }
  ];


  constructor(private getListService: GetAnimalListService) {}

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.getListService.getUsers(pageIndex, pageSize).subscribe(
      (data) => {
        this.loading = false;
        this.total = data.results.length;
        this.listOfData = data.results;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
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

  onEdit(item: Animals): void {
    console.log('Edit action', item);
    // todo logic
  }

  onDelete(item: Animals): void {
    console.log('Delete action', item);
    // todo logic
  }

  openEditModal(): void {
    this.isVisible = true;
    this.modalTitle;
  }
  searchValue = '';

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }
}
