import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../admin-services/products.service';
import {Observable, Subject} from 'rxjs';
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
  ProductDataUpdated: Subject<any> = new Subject();
  productData;
  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: ActivatedRoute,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.productId = this.router.snapshot.queryParamMap.get('productId');
    console.log(`productId: ${this.productId}`);
    this.ps = this.productsService;
    this.units = this.ps.GetAllUnits();
    this.suppliers = this.ps.GetAllSuppliers();
    this.categories = this.ps.GetAllCategories();
    this.availQuantities = this.ps.GetAvailQuantities(this.productId);

    this.productData = this.formBuilder.group({
      productId: ['00000000-0000-0000-0000-000000000000'],
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
        this.ps.GetProductCategories(this.productId).subscribe(categoryResult => {
          this.ps.GetAvailQuantities(this.productId).subscribe(quantResult => {
            console.log(`Data: ${JSON.stringify(categoryResult)}`);
            this.productData.setValue({
              productId: result.productId,
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
              availQuantity: quantResult === undefined ? [] : quantResult,
              category: categoryResult === undefined ? [] : categoryResult
            });

            this.ProductDataUpdated.next();
          });
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

      this.ps.errorResponse.detail = 'Przetwarzanie danych. Proszę czekać ...';
      this.ps.errorResponse.status = 300;
      this.alertVisibility = 1;
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
