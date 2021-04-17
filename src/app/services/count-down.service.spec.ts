import { TestBed } from '@angular/core/testing';

import { CountDownTokenService } from './count-down-token.service';

describe('CountDownService', () => {
  let service: CountDownTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountDownTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
