import { Component, OnInit } from '@angular/core';
import {OrderGrandeService} from '../order-grande.service';
import {SupplierService} from '../../suppliers/supplier.service';
import {Observable, of} from 'rxjs';
import {UserName} from '../../suppliers/userName';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Supplier} from '../../suppliers/supplier';
import {OrderGrande} from '../order-grande';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  alertVisibilityTimeSec = 5;
  ss: SupplierService;
  submitted = false;
  alertVisibility: number;
  public orderData: FormGroup;

  order: Observable<OrderGrande>;
  statuses: Observable<string[]>;

  constructor(private orderGrandeService: OrderGrandeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {

    // this.statuses = this.orderGrandeService.getStatuses();

    this.orderData = this.formBuilder.group({
    orderId: ['00000000-0000-0000-0000-000000000000'],
    orderStartDate: ['', {
      validators: [
        Validators.required
      ]
    }],
    orderStopDate: ['', {
      validators: [
        Validators.required
      ]
    }],
    orderStatusId: ['00000000-0000-0000-0000-000000000000'],
    orderStatusName: ['Zaplanowane', {
      validators: [
        Validators.required
      ]
    }]
  });
  }

  get field(): any {
    return this.orderData.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.orderData.controls[controlName].hasError(errorName);
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

  onSubmit(): void {
    console.log(this.orderData.controls);

    if (this.orderData.invalid) {
      this.submitted = true;

      Object.keys(this.orderData.controls).forEach(field => {
        const control = this.orderData.get(field);
        control.markAsTouched({onlySelf: true});
      });
    } else {
      this.submitted = false;

      console.log(`Raw data: ${JSON.stringify(this.orderData.getRawValue())}`);

      of(this.orderGrandeService.addOrder(this.orderData.getRawValue())).subscribe(result => {
        this.showAlert().subscribe();
      });

      this.router.navigate(['admin/orders/all']);
    }
  }
}


