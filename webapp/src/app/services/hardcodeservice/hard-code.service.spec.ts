import { TestBed } from '@angular/core/testing';

import { HardCodeService } from './hard-code.service';

describe('HardCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HardCodeService = TestBed.get(HardCodeService);
    expect(service).toBeTruthy();
  });
});
