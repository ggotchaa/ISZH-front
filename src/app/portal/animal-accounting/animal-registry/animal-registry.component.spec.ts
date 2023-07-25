import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRegistryComponent } from './animal-registry.component';

describe('AnimalRecordsComponent', () => {
  let component: AnimalRegistryComponent;
  let fixture: ComponentFixture<AnimalRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalRegistryComponent]
    });
    fixture = TestBed.createComponent(AnimalRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
