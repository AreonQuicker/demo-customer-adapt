import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCreateRequest } from '../../../models/customerCreateRequest';
import { CustomerUpdateRequest } from '../../../models/customerUpdateRequest';
import { CustomerModel } from '../../../models/customerModel';

@Component({
  selector: 'app-customer-upsert',
  templateUrl: './customer-upsert.component.html',
  styleUrls: ['./customer-upsert.component.scss'],
})
export class CustomerUpsertComponent implements OnInit {
  form: FormGroup;
  @Output() upsert = new EventEmitter<
    CustomerCreateRequest | CustomerUpdateRequest
  >();
  @Input() isLoading: boolean = false;
  @Input() customer: CustomerModel | null = null;

  get isUpdate(): boolean {
    return !!this.customer;
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      invoiceTotal: new FormControl(this.customer?.invoiceTotal || 0, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    if (this.customer) {
      this.form.patchValue(this.customer);
    }
    if (this.isUpdate) this.form.get('email')?.disable();
  }

  onUpsert() {
    this.upsert.emit(this.form!.value);
  }

  onBack() {
    this.router.navigate(['/customers']).then(_ => {});
  }
}
