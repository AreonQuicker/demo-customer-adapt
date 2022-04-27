import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerModel } from '../../../models/customerModel';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  ColumnMode = ColumnMode;

  @Output() delete = new EventEmitter<CustomerModel>();
  @Output() update = new EventEmitter<CustomerModel>();
  @Input() rows: CustomerModel[] = [];

  constructor() {}

  onDelete(row: CustomerModel) {
    this.delete.emit(row);
  }

  onUpdate(row: CustomerModel) {
    this.update.emit(row);
  }
}
