import {Pipe, PipeTransform} from '@angular/core';
import {numeric} from '@rxweb/reactive-form-validators';

@Pipe({
  name: 'currencyPln'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | string, symbol: string): string {
    if (typeof value === 'number') {
      return `${value.toFixed(2)} ${symbol}`;
    }

    return `${Number(value).toFixed(2)} ${symbol}`;
  }
}
