import { TestBed, inject } from '@angular/core/testing';

import { BackendConnectService } from './backend-connect.service';

describe('BackendConnectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendConnectService]
    });
  });

  it('should be created', inject([BackendConnectService], (service: BackendConnectService) => {
    expect(service).toBeTruthy();
  }));
});
