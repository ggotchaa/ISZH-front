import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit{
  
  selectedMenu: string | undefined;
  selectedMenuItem: string | undefined;

  showContent(menu: string): void {
    this.selectedMenu = menu;
  }

  openContent(event: { item: { key: string } }): void {
    this.selectedMenuItem = event.item.key;
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
