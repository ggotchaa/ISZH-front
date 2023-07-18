import {Component} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";


@Component({
  selector: 'app-animal-accounting',
  templateUrl: './animal-accounting.component.html',
  styleUrls: ['./animal-accounting.component.scss']
})
export class AnimalAccountingComponent {
  isVisibleSetting = false;
  isVisibleFilter = false;

  constructor() {
  }

  showModalSetting(): void {
    this.isVisibleSetting = true;
  }

  handleOk(): void {
    this.isVisibleSetting = false;
  }

  handleCancel(): void {
    this.isVisibleSetting = false;
  }

  showModalFilter(): void {
    this.isVisibleFilter = true;
  }
  handleOkFilter(): void {
    this.isVisibleFilter = false;
  }

  handleCancelFilter(): void {
    this.isVisibleFilter = false;
  }
}
