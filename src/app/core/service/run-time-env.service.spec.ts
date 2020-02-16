import { TestBed } from '@angular/core/testing';

import { RunTimeEnvService } from './run-time-env.service';

describe('RunTimeEnvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunTimeEnvService = TestBed.get(RunTimeEnvService);
    expect(service).toBeTruthy();
  });
});
