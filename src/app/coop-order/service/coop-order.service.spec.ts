import { TestBed } from '@angular/core/testing';

import { CoopOrderService } from './coop-order.service';

describe('CoopOrderService', () => {
  let service: CoopOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoopOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
