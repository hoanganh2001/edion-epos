import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyDisplay',
  standalone: true,
})
export class CurrencyDisplayPipe implements PipeTransform {
  transform(currentValue: string | number | undefined): string {
    let value = structuredClone(currentValue)
    if(value){
      if(value.toString().includes('¥')){
        return value.toString();
      }
    }

    if (value === undefined || value === null) {
      return '-';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value.replaceAll(',','')) : value;

    if (isNaN(numericValue)) {
      return '-';
    }

    return `¥${numericValue.toLocaleString()}`;
  }
}
