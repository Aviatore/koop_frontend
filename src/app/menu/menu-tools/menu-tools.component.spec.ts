import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuToolsComponent } from './menu-tools.component';

describe('MenuToolsComponent', () => {
  let component: MenuToolsComponent;
  let fixture: ComponentFixture<MenuToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
