import { TestBed } from '@angular/core/testing';

import { RiddleService } from './riddle.service';

describe('RiddleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiddleService = TestBed.get(RiddleService);
    expect(service).toBeTruthy();
  });
});
