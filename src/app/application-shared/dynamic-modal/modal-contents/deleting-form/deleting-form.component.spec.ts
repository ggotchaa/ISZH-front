import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletingFormComponent } from './deleting-form.component';

describe('DeletingFormComponent', () => {
  let component: DeletingFormComponent;
  let fixture: ComponentFixture<DeletingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletingFormComponent]
    });
    fixture = TestBed.createComponent(DeletingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
