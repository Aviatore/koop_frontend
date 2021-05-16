import {Role} from './role';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {JwtParserService} from '../../services/jwt-parser.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class Visibility {

  constructor() { }

  static set(roles: Role[]): boolean {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    if (token && !jwtHelper.isTokenExpired(token)) {
      const tokenRoles = new JwtParserService().getUserRoles();
      for (const role of roles) {
        for (const tokenRole of tokenRoles) {
          if (role === tokenRole) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
