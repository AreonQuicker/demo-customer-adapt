import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadService } from '../../../state-services/load.service';
import { CustomerUpdateRequest } from '../../../models/customerUpdateRequest';
import { BaseComponentDirective } from '../../../common/base/base-component.directive';
import { CustomerModel } from '../../../models/customerModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-update-page',
  templateUrl: './customer-update-page.component.html',
  styleUrls: ['./customer-update-page.component.scss'],
})
export class CustomerUpdatePageComponent extends BaseComponentDirective {
  id: number | null = null;
  customer: CustomerModel | null = null;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    loadService: LoadService
  ) {
    //get id from route
    super(loadService);

    this.subscription?.add(
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.isLoading = true;
        this.customerService.get(this.id).subscribe({
          next: customer => {
            this.isLoading = false;
            this.customer = customer.data;
          },
          error: error => {
            this.isLoading = false;
            this.router.navigate(['/customers']).then(_ => {});
          },
        });
      })
    );
  }

  onUpdate(updateRequest: CustomerUpdateRequest) {
    this.isLoading = true;
    this.customerService.update(this.id!, updateRequest).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/customers']).then(_ => {});
        this.toastr.success('Customer updated successfully');
      },
      error: err => {
        this.isLoading = false;
      },
    });
  }
}
