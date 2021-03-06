import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingStateService {

  private history = [];

  constructor(private router: Router) {}

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history.slice(-5), urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    console.log(`All routes: ${this.history}`);
    console.log(`Returning previous URL: ${this.history[this.history.length - 1] || ''}`);
    return this.history[this.history.length - 1] || '';
  }
}
