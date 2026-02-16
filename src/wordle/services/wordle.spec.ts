import { TestBed } from '@angular/core/testing';

import { Wordle } from './wordle';

describe('Wordle', () => {
  let service: Wordle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wordle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
