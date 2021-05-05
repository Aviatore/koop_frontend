import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../admin-interfaces/user';
import {UsersService} from '../admin-services/users.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {interval, Observable, of} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {UniqueEmailValidator} from '../admin-validators/async-validators';
import {UniqueUserNameValidator} from '../admin-validators/userName-validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  alertVisibilityTimeSec = 5;
  us: UsersService;
  submitted = false;
  alertVisibility: number;
  funds: Observable<Funds[]>;
  userData;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.funds = this.usersService.GetAllUnits();
    this.us = this.usersService;

    this.userData = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      userName: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [
          new UniqueUserNameValidator(this.usersService)
        ],
        updateOn: 'blur'
      }],
      phoneNumber: [''],
      email: ['', {
        validators: [
          Validators.required,
          RxwebValidators.email()
        ],
        asyncValidators: [
          new UniqueEmailValidator(this.usersService)
        ],
        updateOn: 'blur'
      }],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      repeatPassword: ['', [
        Validators.required,
        RxwebValidators.compare({fieldName: 'newPassword'})
      ]],
      debt: [''],
      fundId: ['', Validators.required],
      info: ['']
    });
  }

  get firstName(): any {
    return this.userData.get('firstName');
  }

  get field(): any {
    return this.userData.controls;
  }

  get email(): any {
    return this.userData.get('email');
  }

  get repeatPassword(): any {
    return this.userData.get('repeatPassword');
  }

  onSubmit(): void {
    console.log(this.userData.controls);

    if (this.field.fundId.value === '0') {
      this.field.fundId.setErrors({required: true});
    }

    if (this.userData.invalid) {
      this.submitted = true;

      Object.keys(this.userData.controls).forEach(field => {
        const control = this.userData.get(field);
        control.markAsTouched({onlySelf: true});
      });
    } else {
      this.submitted = false;

      // console.log(`Raw data: ${JSON.stringify(this.userData.getRawValue())}`);
      of(this.usersService.CreateUser(this.userData.getRawValue())).subscribe(result => {
        this.showAlert().subscribe(this.userData.reset());
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
