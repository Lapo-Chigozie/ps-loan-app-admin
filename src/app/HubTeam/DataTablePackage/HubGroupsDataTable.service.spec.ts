/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HubGroupsDataTableService } from './HubGroupsDataTable.service';

describe('Service: HubGroupsDataTable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HubGroupsDataTableService]
    });
  });

  it('should ...', inject([HubGroupsDataTableService], (service: HubGroupsDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
