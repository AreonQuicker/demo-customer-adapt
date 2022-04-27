import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CustomerModel } from '../../../models/customerModel';
import { LoadService } from '../../../state-services/load.service';
import { BaseComponentDirective } from '../../../common/base/base-component.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
})
export class CustomerListPageComponent
  extends BaseComponentDirective
  implements OnInit
{
  title = 'demo-customer-adapt';
  rows: CustomerModel[] = [];
  searchRows: CustomerModel[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService,
    loadService: LoadService
  ) {
    super(loadService);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.customerService.getAll().subscribe({
      next: customers => {
        this.rows = customers.data;
        this.searchRows = customers.data;
        this.isLoading = false;
      },
      error: err => {
        // TODO: handle error
        this.isLoading = false;
      },
    });
  }

  onFilterChange($event: string) {
    if (!$event) {
      this.searchRows = this.rows;
      return;
    }

    this.searchRows = this.rows.filter(row => {
      return (
        row.firstName.toLowerCase().includes($event.toLowerCase()) ||
        row.lastName.toLowerCase().includes($event.toLowerCase()) ||
        row.email.toLowerCase().includes($event.toLowerCase())
      );
    });

    //this.table!.offset = 0;
    //TODO: fix this
  }

  onDelete(customer: CustomerModel) {
    if (
      confirm(
        'Are you sure to delete ' + customer.firstName + ' ' + customer.lastName
      )
    ) {
      this.isLoading = true;
      this.customerService.delete(customer.id).subscribe({
        next: data => {
          this.isLoading = false;
          this.toastr.success('Customer deleted successfully');
          this.load();
        },
        error: err => {
          this.isLoading = false;
        },
      });
    }
  }
  onUpdate($event: CustomerModel) {
    this.router.navigate(['/customer/edit', $event.id]);
  }

  onReload() {
    this.load();
  }
}
