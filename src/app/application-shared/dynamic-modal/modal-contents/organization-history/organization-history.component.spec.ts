import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHistoryComponent } from './organization-history.component';

describe('OrganizationHistoryComponent', () => {
  let component: OrganizationHistoryComponent;
  let fixture: ComponentFixture<OrganizationHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationHistoryComponent]
    });
    fixture = TestBed.createComponent(OrganizationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
