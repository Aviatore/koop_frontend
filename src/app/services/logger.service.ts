import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  color = {
    debug: ['color: gray', 'color: black'],
    info: ['color: green', 'color: black'],
    warn: ['color: orange', 'color: black'],
    error: ['color: red', 'color: black']
  };
  constructor() { }

  getTime(): string {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const miliseconds = time.getMilliseconds().toString().padStart(3, '0');

    return `${hours}:${minutes}:${seconds}:${miliseconds}`;
  }

  debug(message: string): string[] {
    const messageFormat = [`%cDEBUG (${this.getTime()})\n%c${message}`];
    messageFormat.push(...this.color.debug);
    return messageFormat;
  }

  info(message: string): string[] {
    const messageFormat = [`%cINFO (${this.getTime()})\n%c${message}`];
    messageFormat.push(...this.color.info);
    return messageFormat;
  }

  warn(message: string): string[] {
    const messageFormat = [`%cWARN (${this.getTime()})\n%c${message}`];
    messageFormat.push(...this.color.warn);
    return messageFormat;
  }

  error(message: string): string[] {
    const messageFormat = [`%cERROR (${this.getTime()})\n%c${message}`];
    messageFormat.push(...this.color.error);
    return messageFormat;
  }
}
