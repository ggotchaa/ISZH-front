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
  selectedTab: string | null = null;

  onTabChange(event: number): void {
  }

  showContent(menuItem: string): void {
    this.selectedMenu = menuItem;
    this.router.navigate([`/administration/${menuItem}`]);
  }
  

  openContent(event: { item: { key: string } }): void {
    this.selectedMenuItem = event.item.key;
  }
  
  ngOnInit(): void {
    this.selectedTab = this.route.snapshot.firstChild?.routeConfig?.path ?? 'users';
  }
  
}
