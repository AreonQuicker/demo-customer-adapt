import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
})
export class CustomerSearchComponent implements OnInit {
  form: FormGroup;

  @Output() filterChange = new EventEmitter<string>();
  @Output() reload = new EventEmitter();

  get filterControl(): FormControl {
    return this.form.get('filter')! as FormControl;
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      filter: [''],
    });
  }

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.filterChange.emit(value);
    });
  }

  onCreate() {
    this.router.navigate(['/customers/new']).then(_ => {});
  }

  onReload() {
    this.reload.emit();
  }
}
