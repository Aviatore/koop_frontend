import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitOrderDialogComponent } from './submit-order-dialog.component';

describe('SubmitOrderDialogComponent', () => {
  let component: SubmitOrderDialogComponent;
  let fixture: ComponentFixture<SubmitOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
