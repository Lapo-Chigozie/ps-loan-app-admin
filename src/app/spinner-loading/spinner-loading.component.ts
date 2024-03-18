import { Component, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerLoadingComponent {
  constructor(public loader: SpinnerService) { }
}
