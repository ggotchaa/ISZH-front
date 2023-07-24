import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSettingsFormComponent } from './table-settings-form.component';

describe('TableSettingsFormComponent', () => {
  let component: TableSettingsFormComponent;
  let fixture: ComponentFixture<TableSettingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSettingsFormComponent]
    });
    fixture = TestBed.createComponent(TableSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
