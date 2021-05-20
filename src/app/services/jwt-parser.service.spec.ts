import { TestBed } from '@angular/core/testing';

import { JwtParserService } from './jwt-parser.service';

describe('JwtParserService', () => {
  let service: JwtParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
