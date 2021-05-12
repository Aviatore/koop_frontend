import { TestBed } from '@angular/core/testing';

import { OrderMakerService } from './order-maker.service';

describe('OrderMakerService', () => {
  let service: OrderMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
