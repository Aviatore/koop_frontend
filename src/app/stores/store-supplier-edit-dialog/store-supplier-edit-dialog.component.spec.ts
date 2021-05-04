import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSupplierEditDialogComponent } from './store-supplier-edit-dialog.component';

describe('StoreSupplierEditDialogComponent', () => {
  let component: StoreSupplierEditDialogComponent;
  let fixture: ComponentFixture<StoreSupplierEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSupplierEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSupplierEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
