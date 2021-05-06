import {Role} from './role';
import {Injectable} from '@angular/core';
import {JwtParserService} from '../../services/jwt-parser.service';

@Injectable({
  providedIn: 'root'
})

export class Visibility {

  constructor() { }

  static set(roles: Role[]): boolean {
    const tokenRoles = new JwtParserService().getUserRoles();
    for (const role of roles) {
      for (const tokenRole of tokenRoles) {
        if (role === tokenRole) {
          return true;
        }
      }
    }
    return false;
  }
}
