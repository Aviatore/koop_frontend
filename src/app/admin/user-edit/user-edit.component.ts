import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../admin-services/users.service';
import {Observable, of} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {FormBuilder, Validators} from '@angular/forms';
import {UniqueUserNameValidator} from '../admin-validators/userName-validator';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {UniqueEmailValidator} from '../admin-validators/async-validators';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../admin-interfaces/user';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId: string;
  user: User;
  alertVisibilityTimeSec = 5;
  us: UsersService;
  submitted = false;
  alertVisibility: number;
  funds: Observable<Funds[]>;
  userData;
  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: ActivatedRoute,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.userId = this.router.snapshot.paramMap.get('userId');

    this.funds = this.usersService.GetAllUnits();
    this.us = this.usersService;
    this.us.errorResponse = {
      detail: '',
      status: 0
    };

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
        updateOn: 'blur'
      }],
      phoneNumber: [null],
      email: ['', {
        validators: [
          Validators.required,
          RxwebValidators.email()
        ],
        updateOn: 'blur'
      }],
      newPassword: [null, [
        Validators.minLength(8)
      ]],
      oldPassword: [null],
      debt: [''],
      fundId: ['', Validators.required],
      info: [''],
      id: [null]
    });

    this.us.GetUserById(this.userId).subscribe(result => {
      this.userData.setValue({
        firstName: result.firstName,
        lastName: result.lastName,
        userName: result.userName,
        phoneNumber: result.phoneNumber,
        email: result.email,
        debt: result.debt,
        fundId: result.fundId,
        info: result.info,
        newPassword: '',
        oldPassword: '',
        id: result.id
      });
    });
  }

  get field(): any {
    return this.userData.controls;
  }

  onSubmit(): void {
    // return null;
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

      const user: User = this.userData.getRawValue();
      console.log(...this.logger.info(`User data: ${user.id}`));
      // console.log(`Raw data: ${JSON.stringify(this.userData.getRawValue())}`);
      of(this.usersService.editUser(user)).subscribe(
        result => {
          this.showAlert().subscribe();
        }
      );
      /*of(this.usersService.editUser(this.userData.getRawValue())).subscribe(result => {
        this.showAlert();
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
