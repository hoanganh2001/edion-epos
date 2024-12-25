import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyDisplay',
  standalone: true,
})
export class CurrencyDisplayPipe implements PipeTransform {
  transform(value: string | number | undefined): string {
    if(value){
      if(value.toString().includes('¥')){
        return value.toString();
      }
    }
    
    if (value === undefined || value === null) {
      return '-';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return '-';
    }

    return `¥${numericValue.toLocaleString()}`;
  }
}
