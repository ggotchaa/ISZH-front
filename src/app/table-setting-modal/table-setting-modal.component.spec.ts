import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSettingModalComponent } from './table-setting-modal.component';

describe('TableSettingFormComponent', () => {
  let component: TableSettingModalComponent;
  let fixture: ComponentFixture<TableSettingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSettingModalComponent]
    });
    fixture = TestBed.createComponent(TableSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
