import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Input() modalTitle!: string;
  @Input() modalContent!: string;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  constructor() { }

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
