import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-animal-accounting',
  templateUrl: './animal-accounting.component.html',
  styleUrls: ['./animal-accounting.component.scss']
})
export class AnimalAccountingComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  selectedMenu: string | undefined;
  selectedMenuItem: string | undefined;
  selectedTab: string | null = null;

  onTabChange(event: number): void {
  }

  showContent(menuItem: string): void {
    this.selectedMenu = menuItem;
    this.router.navigate([`/animal-accounting/${menuItem}`]);
  }


  openContent(event: { item: { key: string } }): void {
    this.selectedMenuItem = event.item.key;
  }

  ngOnInit(): void {
    this.selectedTab = this.route.snapshot.firstChild?.routeConfig?.path ?? 'users';
  }

}
