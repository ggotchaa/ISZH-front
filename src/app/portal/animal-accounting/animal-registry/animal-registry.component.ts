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

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Акмолинская область',
    children: [{name: '0-0-0'}, {name: '0-0-1'}, {name: '0-0-2'}]
  },
  {
    name: 'Актюбинская область',
    children: [
      {
        name: '0-1-0',
        children: [{name: '0-1-0-0'}, {name: '0-1-0-1'}]
      },
      {
        name: '0-1-1',
        children: [{name: '0-1-1-0'}, {name: '0-1-1-1'}]
      }
    ]
  },
  {
    name: 'Алматинская область',
    children: [{name: '0-0-0'}, {name: '0-0-1'}, {name: '0-0-2'}]
  },
  {
    name: 'Атырауская область',
    children: [{name: '0-0-0'}, {name: '0-0-1'}, {name: '0-0-2'}]
  },
  {
    name: 'Западно-Казахстанская область',
    children: [{name: '0-0-0'}, {name: '0-0-1'}, {name: '0-0-2'}]
  },
  {
    name: 'Жамбылская область',
    children: [{name: '0-0-0'}, {name: '0-0-1'}, {name: '0-0-2'}]
  },
  {
    name: 'Карагандинская область',
    children: [{name: '0-0-0'}, {name: '0-0-1'}, {name: '0-0-2'}]
  },
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

class FilteredTreeResult {
  constructor(public treeData: TreeNode[], public needsToExpanded: TreeNode[] = []) {
  }
}

/**
 * From https://stackoverflow.com/a/45290208/6851836
 */
function filterTreeData(data: TreeNode[], value: string): FilteredTreeResult {
  const needsToExpanded = new Set<TreeNode>();
  const _filter = (node: TreeNode, result: TreeNode[]): TreeNode[] => {
    if (node.name.search(value) !== -1) {
      result.push(node);
      return result;
    }
    if (Array.isArray(node.children)) {
      const nodes = node.children.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
      if (nodes.length) {
        const parentNode = {...node, children: nodes};
        needsToExpanded.add(parentNode);
        result.push(parentNode);
      }
    }
    return result;
  };
  const treeData = data.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
  return new FilteredTreeResult(treeData, [...needsToExpanded]);
}

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
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  expandedNodes: TreeNode[] = [];
  searchValue1 = '';
  originData$ = new BehaviorSubject(TREE_DATA);
  searchValue$ = new BehaviorSubject<string>('');


  selectedMenu: string | undefined;
  selectedMenuItem: string | undefined;
  selectedTab: string | null = null;

  onTabChange(event: number): void {
  }

  showContent(menuItem: string): void {
    this.selectedMenu = menuItem;
    this.router.navigate([`/${menuItem}`]);
  }


  openContent(event: { item: { key: string } }): void {
    this.selectedMenuItem = event.item.key;
  }


  transformer = (node: TreeNode, level: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          level
        };
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeControl = new FlatTreeControl<FlatNode, TreeNode>(
    node => node.level,
    node => node.expandable,
    {
      trackBy: flatNode => this.flatNodeMap.get(flatNode)!
    }
  );

  treeFlattener = new NzTreeFlattener<TreeNode, FlatNode, TreeNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  filteredData$ = combineLatest([
    this.originData$,
    this.searchValue$.pipe(
      auditTime(300),
      map(value => (this.searchValue1 = value))
    )
  ]).pipe(map(([data, value]) => (value ? filterTreeData(data, value) : new FilteredTreeResult(data))));

  constructor(private getListService: GetAnimalListService, private router: Router, private route: ActivatedRoute) {
    this.filteredData$.subscribe(result => {
      this.dataSource.setData(result.treeData);

      const hasSearchValue = !!this.searchValue1;
      if (hasSearchValue) {
        if (this.expandedNodes.length === 0) {
          this.expandedNodes = this.treeControl.expansionModel.selected;
          this.treeControl.expansionModel.clear();
        }
        this.treeControl.expansionModel.select(...result.needsToExpanded);
      } else {
        if (this.expandedNodes.length) {
          this.treeControl.expansionModel.clear();
          this.treeControl.expansionModel.select(...this.expandedNodes);
          this.expandedNodes = [];
        }
      }
    });
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  actions = [
    {name: 'Edit', callback: this.onEdit},
    {name: 'Delete', callback: this.onDelete},
    {name: 'Изменить', callback: this.openEditModal}
  ];


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

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    this.selectedTab = this.route.snapshot.firstChild?.routeConfig?.path ?? 'users';
  }
}
