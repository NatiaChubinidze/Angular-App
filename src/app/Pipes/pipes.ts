import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class capitalize implements PipeTransform {
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  transform(value: string) {
    return value.split('.').map(this.capitalize).join('.');
  }
}
