import { Component } from '@angular/core';
import { LoadService } from './state-services/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public loadService: LoadService) {}
}
