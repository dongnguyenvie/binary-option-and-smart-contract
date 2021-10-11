import { Pipe, PipeTransform } from '@angular/core';
import { ethers, BigNumber } from 'ethers';

@Pipe({
  name: 'balance',
})
export class BalancePipe implements PipeTransform {
  transform(value?: any, args?: any): any {
    return value ? ethers.utils.formatUnits(BigNumber.from(value)) : '';
  }
}
