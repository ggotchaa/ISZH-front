import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent implements OnInit {
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
  ngAfterContentInit() {
    console.log('Content:', this.el.nativeElement.innerHTML);
  }
}
