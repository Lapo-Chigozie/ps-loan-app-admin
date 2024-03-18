/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HubTeamMemberDataTableService } from './HubTeamMemberDataTable.service';

describe('Service: HubTeamMemberDataTable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HubTeamMemberDataTableService]
    });
  });

  it('should ...', inject([HubTeamMemberDataTableService], (service: HubTeamMemberDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
