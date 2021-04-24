import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSupplierReceivablesComponent } from './report-supplier-receivables.component';

describe('ReportSupplierReceivablesComponent', () => {
  let component: ReportSupplierReceivablesComponent;
  let fixture: ComponentFixture<ReportSupplierReceivablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSupplierReceivablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSupplierReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
