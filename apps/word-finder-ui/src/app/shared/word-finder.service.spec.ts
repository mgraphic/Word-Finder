import { TestBed } from '@angular/core/testing';

import { WordFinderService } from './word-finder.service';

describe('WordFinderService', () => {
  let service: WordFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
