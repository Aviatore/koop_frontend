import { Injectable, InjectionToken } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountDownTokenService {
  timeSeconds = 0;

  constructor() { }

  GetTimer(seconds: number): Observable<any> {
    return new Observable(observer => {
      this.timeSeconds = seconds;
      const intervalHandler = setInterval(() => {
        this.timeSeconds -= 1;

        if (this.timeSeconds < 0)
        {
          this.timeSeconds = 0;
        }
      }, 1000);
    });
  }
}
