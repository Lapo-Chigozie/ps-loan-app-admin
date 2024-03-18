/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppMonthlyNetPaysServicesService } from './AppMonthlyNetPaysServices.service';

describe('Service: AppMonthlyNetPaysServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppMonthlyNetPaysServicesService]
    });
  });

  it('should ...', inject([AppMonthlyNetPaysServicesService], (service: AppMonthlyNetPaysServicesService) => {
    expect(service).toBeTruthy();
  }));
});
