import { Component } from '@angular/core';

@Component({
  selector: 'app-search-animal-filter',
  templateUrl: './search-animal-filter.component.html',
  styleUrls: ['./search-animal-filter.component.scss']
})
export class SearchAnimalFilterComponent {
  selectedValue = null;
  date = null;

  constructor() {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
