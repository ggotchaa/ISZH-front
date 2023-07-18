import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersFormComponent } from './add-users-form.component';

describe('AddOrganizationFormComponent', () => {
  let component: AddUsersFormComponent;
  let fixture: ComponentFixture<AddUsersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUsersFormComponent]
    });
    fixture = TestBed.createComponent(AddUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
