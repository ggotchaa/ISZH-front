import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-table-setting-modal',
  templateUrl: './table-setting-modal.component.html',
  styleUrls: ['./table-setting-modal.component.scss']
})
export class TableSettingModalComponent {
  @Input() modalTitle!: string;
  constructor(private el: ElementRef) { }

  @Input()
  set isVisible(value: boolean) {
    this._isVisible = value;
    this.isVisibleChange.emit(value);
  }
  get isVisible() {
    return this._isVisible;
  }
  private _isVisible!: boolean;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  ngOnInit(): void {}

  handleCancel(): void {
    this.isVisible = false;
    this.onCancel.emit();
  }

  handleOk(): void {
    this.isVisible = false;
    this.onConfirm.emit();
  }
}
