import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tick } from '../../utils/utils';
import { LoadService } from '../../state-services/load.service';

@Directive({
  selector: '[appBaseComponent]',
})
export class BaseComponentDirective implements OnDestroy {
  private _isLoading = false;
  protected subscription: Subscription = new Subscription();
  public get isLoading(): boolean {
    return this._isLoading;
  }
  protected set isLoading(value: boolean) {
    this._isLoading = value;
    tick(() => {
      this.loadService.setLoading(this._isLoading);
    });
  }

  constructor(protected loadService: LoadService) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
