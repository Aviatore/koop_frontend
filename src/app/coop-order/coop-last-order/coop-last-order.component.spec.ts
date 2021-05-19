import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopLastOrderComponent } from './coop-last-order.component';

describe('CoopLastOrderComponent', () => {
  let component: CoopLastOrderComponent;
  let fixture: ComponentFixture<CoopLastOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoopLastOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoopLastOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
