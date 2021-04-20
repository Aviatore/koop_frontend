import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCoopDebtComponent } from './report-coop-debt.component';

describe('ReportCoopDeptComponent', () => {
  let component: ReportCoopDebtComponent;
  let fixture: ComponentFixture<ReportCoopDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCoopDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCoopDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
