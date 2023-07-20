import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRegistryTableComponent } from './animal-registry-table.component';

describe('AnimalRegistryTableComponent', () => {
  let component: AnimalRegistryTableComponent;
  let fixture: ComponentFixture<AnimalRegistryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalRegistryTableComponent]
    });
    fixture = TestBed.createComponent(AnimalRegistryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
