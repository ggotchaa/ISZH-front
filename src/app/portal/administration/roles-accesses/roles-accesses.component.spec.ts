import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAccessesComponent } from './roles-accesses.component';

describe('RolesAccessesComponent', () => {
  let component: RolesAccessesComponent;
  let fixture: ComponentFixture<RolesAccessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesAccessesComponent]
    });
    fixture = TestBed.createComponent(RolesAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
