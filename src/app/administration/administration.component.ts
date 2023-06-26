import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute) {}
  selectedMenu: string | undefined;
  selectedMenuItem: string | undefined;
  selectedTabIndex: number = 0;
  selectedTab: string | null = null;

  onTabChange(event: number): void {
    this.selectedTabIndex = event;
  }

  showContent(menuItem: string): void {
    this.selectedMenu = menuItem;

    if (menuItem === 'organizations') {
      this.router.navigate(['/administration/organizations']);
    }
    if (menuItem === 'users') {
      this.router.navigate(['/administration/users']);
    }
    // if (menuItem === 'roles-permissions') {
    //   this.router.navigate(['/administration/roles-permissions']);
    // }
    // if (menuItem === 'contracts') {
    //   this.router.navigate(['/administration/contracts']);
    // }
  }

  openContent(event: { item: { key: string } }): void {
    this.selectedMenuItem = event.item.key;
  }
  
  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.selectedTab = url.length > 0 ? url[0].path : 'users';
    });
  }
}
