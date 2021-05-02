import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditSelfComponent } from './user-edit-self.component';

describe('UserEditSelfComponent', () => {
  let component: UserEditSelfComponent;
  let fixture: ComponentFixture<UserEditSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditSelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
