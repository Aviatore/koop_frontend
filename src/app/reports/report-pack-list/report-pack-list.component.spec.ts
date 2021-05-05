import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPackListComponent } from './report-pack-list.component';

describe('ReportPackListComponent', () => {
  let component: ReportPackListComponent;
  let fixture: ComponentFixture<ReportPackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
