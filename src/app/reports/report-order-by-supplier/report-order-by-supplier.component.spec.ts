import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderBySupplierComponent } from './report-order-by-supplier.component';

describe('ReportOrderBySupplierComponent', () => {
  let component: ReportOrderBySupplierComponent;
  let fixture: ComponentFixture<ReportOrderBySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOrderBySupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderBySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
