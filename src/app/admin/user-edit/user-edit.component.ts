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
      info: ['']
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
        repeatPassword: ''
      });
    });
  }

  get field(): any {
    return this.userData.controls;
  }

  onSubmit(): void {
    return null;
    /*console.log(this.userData.controls);

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
    }*/
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
