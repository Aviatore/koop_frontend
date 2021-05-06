import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSupplierComponent } from './store-supplier.component';

describe('StoreSupplierComponent', () => {
  let component: StoreSupplierComponent;
  let fixture: ComponentFixture<StoreSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
