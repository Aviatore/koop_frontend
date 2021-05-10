import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketViewComponent } from './basket-view.component';

describe('BacketViewComponent', () => {
  let component: BasketViewComponent;
  let fixture: ComponentFixture<BasketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
