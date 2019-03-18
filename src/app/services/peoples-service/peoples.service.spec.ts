import { TestBed } from '@angular/core/testing';

import { PeoplesService } from './peoples.service';

describe('PeoplesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeoplesService = TestBed.get(PeoplesService);
    expect(service).toBeTruthy();
  });
});
