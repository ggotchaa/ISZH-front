import {Component, Injectable, Input} from '@angular/core';
import {NzFormatEmitEvent} from "ng-zorro-antd/tree";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import animalRegistryTable from "../../../application-shared/metadata/table-generator/animal-registry.json"
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, combineLatest} from 'rxjs';
import {auditTime, map} from 'rxjs/operators';
import {FlatTreeControl} from '@angular/cdk/tree';
import {NzTreeFlatDataSource, NzTreeFlattener} from 'ng-zorro-antd/tree-view';
import {ActivatedRoute, Router} from "@angular/router";
import { AdministrationService } from 'src/app/services/administration.service';

interface Animals {
  name: string;
  cattleCount: number;
  smallCattlesCount: number;
  pigsCount: number;
  horsesCount: number;
  camelsCount: number;
  hoofedsCount: number;
}

@Injectable({providedIn: 'root'})
export class GetAnimalListService {
  private baseApiUrl = 'http://localhost:5003/';
  private getAnimalListUrl = 'api/registry/api/RegisteredAnimals';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  getUsers(pageIndex: number, pageSize: number): Observable<{ results: Animals[] }> {
    const culture = 'Ru'; // Replace this with the appropriate culture ('Ru' or 'En')
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('culture', culture);

    return this.http.get<{ results: Animals[] }>(`${this.baseApiUrl}${this.getAnimalListUrl}`, {params});
  }

  constructor(private http: HttpClient) {
  }
}

@Component({
  selector: 'app-animal-registry',
  templateUrl: './animal-registry.component.html',
  styleUrls: ['./animal-registry.component.scss']
})
export class AnimalRegistryComponent {
  constructor(private getListService: GetAnimalListService, private administraionService: AdministrationService) {}
  
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
 
  searchValue1 = '';
  searchValue$ = new BehaviorSubject<string>('');
  nodes: any;
  activeNode: any;


  selectedMenu: string | undefined;
  selectedMenuItem: string | undefined;
  selectedTab: string | null = null;

  onTabChange(event: number): void {
  }

  showContent(menuItem: string): void {
    this.selectedMenu = menuItem;
  }


  openContent(event: { item: { key: string } }): void {
    this.selectedMenuItem = event.item.key;
  }



  actions = [
    {name: 'Edit', callback: this.onEdit},
    {name: 'Delete', callback: this.onDelete},
    {name: 'Изменить', callback: this.openEditModal}
  ];

  

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.getListService.getUsers(pageIndex, pageSize).subscribe()
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex, sort, filter} = params;
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

  onExpandChange(e: NzFormatEmitEvent): void {
    const { node } = e;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.administraionService.getStructureById(node.key).subscribe((res) => {
        if (res.body.length > 0) {
          node.addChildren(
            res.body.map((el: { [x: string]: any; id: any; }) => ({
              //title: el[`name${this.activeLang}`],
              value: el.id,
              key: el.id,
              id: el.id,
            }))
          );
        } else {
          node.isLeaf = true;
          node.addChildren([]);
        }
      });
    }
  }

  getStructrueWithUsers(e: { node: { parentNode: { key: any; }; }; }) {
    this.activeNode = e;
    const parentKey = e.node.parentNode ? e.node.parentNode.key : 0;
    this.administraionService
      .getOrgStructureWithUsers(parentKey)
      .subscribe((res) => {
      });
    //this.getContracts(e.node.key);
    //this.activeStructure = e.node.key;
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }
}
