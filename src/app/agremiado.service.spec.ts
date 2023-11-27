import { TestBed } from '@angular/core/testing';

import { AgremiadoService } from './agremiado.service';

describe('AgremiadoService', () => {
  let service: AgremiadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgremiadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
