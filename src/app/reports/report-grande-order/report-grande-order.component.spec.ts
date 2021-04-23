import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGrandeOrderComponent } from './report-grande-order.component';

describe('GrandeOrderComponent', () => {
  let component: ReportGrandeOrderComponent;
  let fixture: ComponentFixture<ReportGrandeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGrandeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGrandeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
