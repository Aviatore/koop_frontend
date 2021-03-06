import {Component, OnInit} from '@angular/core';
import {Supplier} from '../supplier';
import {SupplierService} from '../supplier.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {UserName} from '../userName';

import { Router } from '@angular/router';

import { Location } from '@angular/common';
import {RxwebValidators} from '@rxweb/reactive-form-validators';



@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  isAddMode: boolean;
  id: string;

  alertVisibilityTimeSec = 5;
  ss: SupplierService;
  submitted = false;
  alertVisibility: number;
  coopNames: Observable<UserName[]>;
  public supplierData: FormGroup;

  supplier: Observable<Supplier>;
  constructor(private supplierService: SupplierService,
              private location: Location,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.coopNames = this.supplierService.getUsers();
    this.ss = this.supplierService;


    if (!this.isAddMode) {
      this.supplier = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.supplierService.getSupplier(params.get('id'))),
        tap(supplier => this.supplierData.patchValue(supplier))
      );
    }

    this.supplierData = this.formBuilder.group({
      supplierId: ['00000000-0000-0000-0000-000000000000'],
      supplierName: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }],
      supplierAbbr: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }],
      phone: ['', {
        validators: [
          Validators.required,
        ],
        updateOn: 'blur'
      }],
      email: ['', {
        validators: [
          Validators.required,
          RxwebValidators.email()
        ],
        updateOn: 'blur'
      }],
      receivables: [''],
      description: [''],
      orderClosingDate: ['', Validators.required],
      blocked: [false],
      available: [false],
      picture: [''],
      oproFullName: ['', Validators.required]
    });
  }


    get field(): any {
      return this.supplierData.controls;
    }

    public hasError = (controlName: string, errorName: string) => {
      return this.supplierData.controls[controlName].hasError(errorName);
    }

    onSubmit(): void {
      console.log(this.supplierData.controls);

      if (this.supplierData.invalid) {
        this.submitted = true;

        Object.keys(this.supplierData.controls).forEach(field => {
          const control = this.supplierData.get(field);
          control.markAsTouched({onlySelf: true});
        });
      } else {
        this.submitted = false;

        console.log(`Raw data: ${JSON.stringify(this.supplierData.getRawValue())}`);

        if (!this.isAddMode) {
          of(this.supplierService.editSupplier(this.supplierData.getRawValue())).subscribe(result => {
            this.showAlert().subscribe();
          });
        } else {
          of(this.supplierService.addSupplier(this.supplierData.getRawValue())).subscribe(result => {
            this.showAlert().subscribe();
          });
        }
      }

      this.router.navigate(['allsuppliers']);
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
