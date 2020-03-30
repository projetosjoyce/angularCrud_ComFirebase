import { TestBed } from '@angular/core/testing';

import { ClienteclsService } from './clientecls.service';

describe('ClienteclsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteclsService = TestBed.get(ClienteclsService);
    expect(service).toBeTruthy();
  });
});
