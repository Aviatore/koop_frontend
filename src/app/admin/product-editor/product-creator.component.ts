import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../admin-services/products.service';
import {Observable} from 'rxjs';
import {Unit} from '../admin-interfaces/unit';
import {Supplier} from '../admin-interfaces/supplier';
import {Category} from '../admin-interfaces/categories';
import {FormBuilder, Validators} from '@angular/forms';
import {LoggerService} from '../../services/logger.service';
import {AvailQuantity} from '../admin-interfaces/availQuantity';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-product-editor',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css']
})
export class ProductCreatorComponent implements OnInit {
  alertVisibilityTimeSec = 5;
  submitted = false;
  alertVisibility: number;
  ps: ProductsService;
  units: Observable<Unit[]>;
  suppliers: Observable<Supplier[]>;
  categories: Observable<Category[]>;
  availQuantities: Observable<AvailQuantity[]>;
  productId: string;
  productData;
  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: ActivatedRoute,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.productId = this.router.snapshot.paramMap.get('productId');
    this.ps = this.productsService;
    this.units = this.ps.GetAllUnits();
    this.suppliers = this.ps.GetAllSuppliers();
    this.categories = this.ps.GetAllCategories();
    this.availQuantities = this.ps.GetAvailQuantities(this.productId);

    this.productData = this.formBuilder.group({
      productName: ['', [
        Validators.required
      ]],
      price: [0, [
        Validators.required
      ]],
      picture: [''],
      blocked: [false],
      unitId: ['', [
        Validators.required
      ]],
      available: [''],
      amountMax: [0, [
        Validators.required, Validators.min(0)
      ]],
      description: ['', [
        Validators.required
      ]],
      supplierId: ['', [
        Validators.required
      ]],
      deposit: [''],
      magazine: [''],
      availQuantity: [[], [
        Validators.required
      ]],
      category: [[], [
        Validators.required
      ]],
    });

    if (this.productId !== null) {
      this.ps.GetProductById(this.productId).subscribe(result => {
        this.productData.setValue({
          productName: result.productName,
          price: result.price,
          picture: result.picture,
          blocked: result.blocked,
          unitId: result.unitId,
          available: result.available,
          amountMax: result.amountMax,
          description: result.description,
          supplierId: result.supplierId,
          deposit: result.deposit,
          magazine: result.magazine,
          availQuantity: result.availQuantity,
          category: result.category
        });
      });
    }

    this.ps.errorResponse = {
      detail: '',
      status: 0
    };
  }

  get field(): any {
    return this.productData.controls;
  }

  onSubmit(): void {
    if (this.productData.invalid) {
      this.submitted = true;

      Object.keys(this.productData.controls).forEach(field => {
        const control = this.productData.get(field);
        control.markAsTouched({onlySelf: true});
      });
    } else {
      this.submitted = false;
    }
  }

  showAlert(): Observable<any> {
    console.log(...this.logger.info('Show alert'));
    return new Observable(observer => {
      this.alertVisibility = this.alertVisibilityTimeSec;

      const handler = setInterval(() => {
        this.alertVisibility--;

        if (this.alertVisibility === 0) {
          clearInterval(handler);
        }
      }, 1000);
    });
  }
}
