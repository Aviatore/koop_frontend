import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../admin-interfaces/user';
import {UsersService} from '../admin-services/users.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {BehaviorSubject, interval, Observable, of, Subject} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {UniqueEmailValidator} from '../admin-validators/async-validators';
import {UniqueUserNameValidator} from '../admin-validators/userName-validator';
import {LoggerService} from '../../services/logger.service';
import {Roles} from '../admin-interfaces/roles';
import {delay, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserCreatedComponent} from '../snackbars/user-created/user-created.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  alertVisibilityTimeSec = 3;
  us: UsersService;
  submitted = false;
  alertVisibility: number;
  funds: Observable<Funds[]>;
  roles: Observable<Roles[]>;
  userRoles: string[];
  UserDataUpdated: BehaviorSubject<any>;
  userData;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private logger: LoggerService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.UserDataUpdated = new BehaviorSubject<any>('');
    this.funds = this.usersService.GetAllUnits();
    this.roles = this.usersService.GetALlRoles();
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
          new UniqueUserNameValidator(this.usersService, this.logger)
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
          new UniqueEmailValidator(this.usersService, this.logger)
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
      info: [''],
      role: [[]]
    });

    this.UserDataUpdated.next('');
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
      this.openSnackBar('Tworzenie nowego użytkownika. Proszę czekać ...', 0);
      this.submitted = false;

/*      this.us.errorResponse.detail = 'Tworzenie nowego użytkownika. Proszę czekać ...';
      this.us.errorResponse.status = 300;*/
      this.alertVisibility = 1;

      const user: User = this.userData.getRawValue();
      // console.log(`Raw data: ${JSON.stringify(this.userData.getRawValue())}`);
      this.usersService.CreateUser(user).pipe(delay(2000)).subscribe({
        next: result => {
          this.us.errorResponse = result.body;
          console.log(JSON.stringify(result.body));
          this.openSnackBar(this.us.errorResponse.detail, this.us.errorResponse.status);
          this.resetForm();
          /*this.showAlert().subscribe({
            complete: () => {
              this.resetForm();
              this.userRoles = [];
            }
          });*/
        }
      });
    }
  }

  openSnackBar(msg: string, status: number): void {
    this.snackBar.openFromComponent(UserCreatedComponent, {
      duration: status !== 0 ? 3000 : null,
      panelClass: status === 200 ? 'snack-bar-green' : status === 500 ? 'snack-bar-red' : 'working',
      data: {
        message: msg
      }
    });
  }

  resetForm(): void {
    this.userData.setValue({
      firstName: '',
      lastName: '',
      userName: '',
      phoneNumber: '',
      email: '',
      newPassword: '',
      repeatPassword: '',
      debt: '',
      fundId: '',
      info: '',
      role: []
    });

    Object.keys(this.userData.controls).forEach(field => {
      const control = this.userData.get(field);
      control.markAsUntouched({onlySelf: true});
    });

    this.UserDataUpdated.next('');
  }

/*  showAlert(): Observable<any> {
    return new Observable(observer => {
      this.alertVisibility = this.alertVisibilityTimeSec;

      const handler = setInterval(() => {
        this.alertVisibility--;

        if (this.alertVisibility === 0) {
          clearInterval(handler);
          observer.complete();
        }
      }, 1000);
    });
  }*/
}
