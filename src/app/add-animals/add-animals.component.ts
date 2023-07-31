import { Component } from '@angular/core';

@Component({
  selector: 'app-add-animals',
  templateUrl: './add-animals.component.html',
  styleUrls: ['./add-animals.component.scss']
})
export class AddAnimalsComponent {
  index = 0;
  disable = false;
  selectedValue = null;
  onIndexChange(index: number): void {
    this.index = index;
  }
  cardStyle = {
    width: "100%",
    height: "100%",
  };
}
