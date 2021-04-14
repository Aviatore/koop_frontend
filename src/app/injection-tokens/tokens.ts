import {InjectionToken, Injector} from '@angular/core';
import {CountDownTokenService} from '../services/count-down-token.service';


export const TokenTimer = new InjectionToken<CountDownTokenService>('Timer', {
  providedIn: 'root',
  factory: () => new CountDownTokenService()
});
export const RefTokenTimer = new InjectionToken<CountDownTokenService>('Timer', {
  providedIn: 'root',
  factory: () => new CountDownTokenService()
});
