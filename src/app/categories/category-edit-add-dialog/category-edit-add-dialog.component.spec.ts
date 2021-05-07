import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditAddDialogComponent } from './category-edit-add-dialog.component';

describe('CategoryEditAddDialogComponent', () => {
  let component: CategoryEditAddDialogComponent;
  let fixture: ComponentFixture<CategoryEditAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEditAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
