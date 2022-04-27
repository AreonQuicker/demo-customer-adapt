import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private $loading: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  get isLoading(): Observable<boolean> {
    return this.$loading;
  }

  setLoading(loading: boolean) {
    this.$loading.next(loading);
  }
}
