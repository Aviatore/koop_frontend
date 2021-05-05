import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditDialogComponent } from './store-edit-dialog.component';

describe('StoreEditDialogComponent', () => {
  let component: StoreEditDialogComponent;
  let fixture: ComponentFixture<StoreEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
