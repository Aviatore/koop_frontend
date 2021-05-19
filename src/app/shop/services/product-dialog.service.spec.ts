import { TestBed } from '@angular/core/testing';

import { ProductDialogService } from './product-dialog.service';

describe('ProductDialogService', () => {
  let service: ProductDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
