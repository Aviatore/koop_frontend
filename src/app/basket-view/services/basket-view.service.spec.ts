import { TestBed } from '@angular/core/testing';

import { BasketViewService } from './basket-view.service';

describe('BasketViewService', () => {
  let service: BasketViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
