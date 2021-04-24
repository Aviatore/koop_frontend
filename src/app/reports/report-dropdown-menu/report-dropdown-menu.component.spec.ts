import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDropdownMenuComponent } from './report-dropdown-menu.component';

describe('DropdownMenuComponent', () => {
  let component: ReportDropdownMenuComponent;
  let fixture: ComponentFixture<ReportDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
