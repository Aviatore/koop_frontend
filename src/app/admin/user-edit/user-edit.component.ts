import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../admin-services/users.service';
import {Observable, of} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UniqueUserNameValidator} from '../admin-validators/userName-validator';
import {RxwebValidators, startsWith} from '@rxweb/reactive-form-validators';
import {UniqueEmailValidator} from '../admin-validators/async-validators';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../admin-interfaces/user';
import {LoggerService} from '../../services/logger.service';
import {Roles} from '../admin-interfaces/roles';
import {MatChipEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles: Observable<string[]>;
  userId: string;
  userRoles: Observable<Roles[]>;
  user: User;
  alertVisibilityTimeSec = 5;
  us: UsersService;
  submitted = false;
  alertVisibility: number;
  funds: Observable<Funds[]>;
  roles: string[] = [];
  roleCtrl = new FormControl();
  userData;

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: ActivatedRoute,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.userId = this.router.snapshot.paramMap.get('userId');

    this.funds = this.usersService.GetAllUnits();
    this.usersService.GetALlRoles().subscribe(result => {
      result.forEach(role => this.roles.push(role.name));
    });
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
      id: [null],
      role: [[], Validators.required]
    });

    this.us.GetUserById(this.userId).subscribe(result => {
      this.usersService.GetUserRole(result.id).subscribe(roleResult => {
        const rolesTmp: string[] = [];
        roleResult.forEach(role => rolesTmp.push(role.name));

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
          id: result.id,
          role: rolesTmp
        });

        this.filteredRoles = this.roleCtrl.valueChanges.pipe(
          map((role: string | null) => role ? this._filter(role) : this.userData.get('role').value.slice())
        );
      });
    });
  }

  get field(): any {
    return this.userData.controls;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.roles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const rolesTmp = this.userData.get('role').value.slice();
    rolesTmp.push(event.option.viewValue);
    this.userData.patchValue({
      role: rolesTmp
    });
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  addRole(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const rolesTmp = this.userData.get('role').value.slice();
      rolesTmp.push(value.trim());
      this.userData.patchValue({
        role: rolesTmp
      });
    }

    if (input) {
      input.value = '';
    }

    this.roleCtrl.setValue(null);
  }

  removeRole(role: string): void {
    const rolesTmp = this.userData.get('role').value.slice();
    const index = rolesTmp.indexOf(role);

    if (index >= 0) {
      rolesTmp.splice(index, 1);
    }

    this.userData.patchValue({
      role: rolesTmp
    });
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

      /*of(this.usersService.editUser(this.userData.getRawValue())).subscribe(result => {
        this.showAlert();
      });*/

      this.usersService.editUser(this.userData.getRawValue()).subscribe({
        next: result => {
          console.log(...this.logger.info(`Response body: ${JSON.stringify(result.body)}`));
          this.us.errorResponse = result.body;
        },
        complete: () => {
          /*this.usersService.AddRoleToUser(user, user.role).subscribe({
            next: roleResult => {
              this.us.errorResponse = roleResult.body;
            },
            complete: () => {
              this.showAlert().subscribe();
            }
          });*/
        }
      });
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
