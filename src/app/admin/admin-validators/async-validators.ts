import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {UsersService} from '../admin-services/users.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoggerService} from '../../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private userService: UsersService,
              private logger: LoggerService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    console.log(...this.logger.info('Validating email ...'));
    return this.userService.CheckEmail(control.value).pipe(
      map(result => result.result ? {uniqueEmail: true} : null),
      catchError(() => of(null))
    );
  }
}
