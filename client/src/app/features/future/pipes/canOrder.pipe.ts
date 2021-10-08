import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canOrder',
})
export class CanOrderPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return ((value || Date.now()) / 60) % 2 === 0;
  }
}
