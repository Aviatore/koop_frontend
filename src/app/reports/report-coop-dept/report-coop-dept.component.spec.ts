import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCoopDeptComponent } from './report-coop-dept.component';

describe('ReportCoopDeptComponent', () => {
  let component: ReportCoopDeptComponent;
  let fixture: ComponentFixture<ReportCoopDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCoopDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCoopDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
