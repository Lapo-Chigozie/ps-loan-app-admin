/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientDataTableService } from './clientDataTable.service';

describe('Service: ClientDataTable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientDataTableService]
    });
  });

  it('should ...', inject([ClientDataTableService], (service: ClientDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
