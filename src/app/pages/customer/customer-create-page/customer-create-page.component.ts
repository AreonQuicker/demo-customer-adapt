import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { LoadService } from '../../../state-services/load.service';
import { CustomerCreateRequest } from '../../../models/customerCreateRequest';
import { CustomerUpdateRequest } from '../../../models/customerUpdateRequest';
import { BaseComponentDirective } from '../../../common/base/base-component.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-create-page',
  templateUrl: './customer-create-page.component.html',
  styleUrls: ['./customer-create-page.component.scss'],
})
export class CustomerCreatePageComponent extends BaseComponentDirective {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService,
    loadService: LoadService
  ) {
    super(loadService);
  }

  onCreate(createRequest: CustomerCreateRequest | CustomerUpdateRequest) {
    this.isLoading = true;
    this.customerService
      .create(createRequest as CustomerCreateRequest)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/customers']).then(_ => {});
          this.toastr.success('Customer created successfully');
        },
        error: err => {
          this.isLoading = false;
        },
      });
  }
}
