import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailQuantSelectorComponent } from './avail-quant-selector.component';

describe('AvailQuantSelectorComponent', () => {
  let component: AvailQuantSelectorComponent;
  let fixture: ComponentFixture<AvailQuantSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailQuantSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailQuantSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
