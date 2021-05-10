import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../admin-services/products.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Unit} from '../admin-interfaces/unit';
import {Supplier} from '../admin-interfaces/supplier';
import {Category} from '../admin-interfaces/categories';
import {FormBuilder, Validators} from '@angular/forms';
import {LoggerService} from '../../services/logger.service';
import {AvailQuantity} from '../admin-interfaces/availQuantity';
import {ActivatedRoute} from '@angular/router';
import {delay} from 'rxjs/operators';
import {Product} from '../admin-interfaces/product';
import {AppUrl} from '../../urls/app-url';


@Component({
  selector: 'app-product-editor',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css']
})
export class ProductCreatorComponent implements OnInit {
  domain = AppUrl.DOMAIN;
  alertVisibilityTimeSec = 5;
  submitted = false;
  alertVisibility: number;
  ps: ProductsService;
  units: Observable<Unit[]>;
  suppliers: Observable<Supplier[]>;
  categories: Observable<Category[]>;
  availQuantities: Observable<AvailQuantity[]>;
  productId: string;
  ProductDataUpdated: BehaviorSubject<any> = new BehaviorSubject<any>('');
  imageSelected = false;
  @ViewChild('img') img: ElementRef;
  changePicture = new BehaviorSubject('#');
  productData;
  productContainer;
  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: ActivatedRoute,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.changePicture.pipe(delay(100)).subscribe(value => {
      this.img?.nativeElement.setAttribute('src', value);
    });

    this.productId = this.router.snapshot.queryParamMap.get('productId');
    console.log(`productId: ${this.productId}`);
    this.ps = this.productsService;
    this.units = this.ps.GetAllUnits();
    this.suppliers = this.ps.GetAllSuppliers();
    this.categories = this.ps.GetAllCategories();
    this.availQuantities = this.ps.GetAvailQuantities(this.productId);

    this.productContainer = new FormData();

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
      available: [false],
      amountMax: [0, [
        Validators.required, Validators.min(0)
      ]],
      description: ['', [
        Validators.required
      ]],
      supplierId: ['', [
        Validators.required
      ]],
      deposit: [0],
      magazine: [false],
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

            this.ProductDataUpdated.next('');

            this.imageSelected = true;
            if (result.picture && result.picture.length > 0) {
              this.changePicture.next(this.domain + result.picture);
            }
          });
        });
      });
    }

    this.ps.errorResponse = {
      detail: '',
      status: 0
    };

    this.ProductDataUpdated.next('');
  }

  get field(): any {
    return this.productData.controls;
  }

  uploadFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0].name.split('.');
      const fileExtension = fileName[fileName.length - 1];

      this.productContainer.append('file', event.target.files[0], `pic.${fileExtension}`);

      const fileReader = new FileReader();
      this.imageSelected = true;
      fileReader.onload = (e) => {
        this.changePicture.next(`${e.target.result}`);
      };

      fileReader.readAsDataURL(event.target.files[0]);
    } else {
      console.log('No file selected');
      this.imageSelected = false;
      this.changePicture.next('#');
    }
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

      this.productData.patchValue({
        available: this.productData.get('amountMax').value > 0
      });

      this.productContainer.append('data', JSON.stringify(this.productData.getRawValue()));

      const product: Product = this.productData.getRawValue();
      this.productsService.UpdateProduct(this.productContainer, product.productId).pipe(delay(2000)).subscribe({
        next: result => {
          console.log(...this.logger.info(`Response body: ${JSON.stringify(result.body)}`));
          this.ps.errorResponse = result.body;
          this.showAlert().subscribe();
        }
      });

      this.productContainer = new FormData();

      /*const product: Product = this.productData.getRawValue();
      console.log(...this.logger.info(`Prouct data: ${product.productName}`));

      this.productsService.UpdateProduct(product).pipe(delay(2000)).subscribe({
        next: result => {
          console.log(...this.logger.info(`Response body: ${JSON.stringify(result.body)}`));
          this.ps.errorResponse = result.body;
          this.showAlert().subscribe();
        }
      });*/
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
