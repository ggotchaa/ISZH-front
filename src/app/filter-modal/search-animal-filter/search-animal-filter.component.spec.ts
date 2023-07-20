import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnimalFilterComponent } from './search-animal-filter.component';

describe('SearchAnimalFilterComponent', () => {
  let component: SearchAnimalFilterComponent;
  let fixture: ComponentFixture<SearchAnimalFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAnimalFilterComponent]
    });
    fixture = TestBed.createComponent(SearchAnimalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
