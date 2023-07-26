import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAccountingComponent } from './animal-accounting.component';

describe('AnimalAccountingComponent', () => {
  let component: AnimalAccountingComponent;
  let fixture: ComponentFixture<AnimalAccountingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalAccountingComponent]
    });
    fixture = TestBed.createComponent(AnimalAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
