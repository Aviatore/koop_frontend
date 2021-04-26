import { Component, OnInit } from '@angular/core';
import {Supplier} from '../supplier';
import {SupplierService} from '../supplier.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {UserName} from '../userName';



@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  alertVisibilityTimeSec = 5;
  ss: SupplierService;
  submitted = false;
  alertVisibility: number;
  coopNames: Observable<UserName[]>;
  supplierData;

  supplier: Observable<Supplier>;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.coopNames = this.supplierService.getUsers();

    this.ss = this.supplierService;
    this.supplier = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.supplierService.getSupplier(params.get('id'))),
      tap(supplier => this.supplierData.patchValue(supplier))
    );

    this.supplierData = this.formBuilder.group({
      supplierId: [''],
      supplierName: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        // asyncValidators: [
        //   new UniqueUserNameValidator(this.supplierService)
        // ],
        updateOn: 'blur'
      }],
      supplierAbbr: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        // asyncValidators: [
        //   new UniqueUserNameValidator(this.supplierService)
        // ],
        updateOn: 'blur'
      }],
      phone: [''],
      email: ['', {
        validators: [
          Validators.required,
          // RxwebValidators.email()
        ],
        // asyncValidators: [
        //   new UniqueEmailValidator(this.supplierService)
        // ],
        updateOn: 'blur'
      }],
      receivables: [''],
      description: [''],
      blocked: [''],
      available: [''],
      picture: [''],
      oproFullName: ['', Validators.required]
    });
  }

    get name(): any {
      return this.supplierData.get('Name');
    }

    get field(): any {
      return this.supplierData.controls;
    }

    get email(): any {
      return this.supplierData.get('email');
    }

    onSubmit(): void {
      console.log(this.supplierData.controls);

      // if (this.field.fundId.value === '0') {
      // this.field.fundId.setErrors({required: true});
    // }

      if (this.supplierData.invalid) {
        this.submitted = true;

        Object.keys(this.supplierData.controls).forEach(field => {
          const control = this.supplierData.get(field);
          control.markAsTouched({onlySelf: true});
        });
      } else {
        this.submitted = false;

        console.log(`Raw data: ${JSON.stringify(this.supplierData.getRawValue())}`);
        of(this.supplierService.editSupplier(this.supplierData.getRawValue())).subscribe(result => {
          this.showAlert().subscribe(this.supplierData.reset());
        });
      }
    }

    showAlert(): Observable<any> {
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
