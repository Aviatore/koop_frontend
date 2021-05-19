import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopOrdersComponent } from './coop-orders.component';

describe('CoopOrderComponent', () => {
  let component: CoopOrdersComponent;
  let fixture: ComponentFixture<CoopOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoopOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoopOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
