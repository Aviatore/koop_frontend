import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtParserService {

  constructor() { }

  parseJwt(token): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getUserRoles(): string[] {
    let roles: string[] = [];
    const token = localStorage.getItem('token');
    const tokenDecoded = this.parseJwt(token);
    const roleKey = Object.keys(tokenDecoded).find(p => p.endsWith('role'));
    roles = roles.concat(tokenDecoded[roleKey]);

    return roles;
  }
}
