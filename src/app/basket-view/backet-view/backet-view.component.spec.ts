import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacketViewComponent } from './backet-view.component';

describe('BacketViewComponent', () => {
  let component: BacketViewComponent;
  let fixture: ComponentFixture<BacketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacketViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
