/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppDashboardDtService } from './AppDashboardDt.service';

describe('Service: AppDashboardDt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDashboardDtService]
    });
  });

  it('should ...', inject([AppDashboardDtService], (service: AppDashboardDtService) => {
    expect(service).toBeTruthy();
  }));
});
