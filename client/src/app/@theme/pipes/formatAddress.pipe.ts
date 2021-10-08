import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  transform(address: string ): string {
    const first4Digits = address.slice(0, 4);
    const last4Digits = address.slice(-4);
    return first4Digits.concat('....', last4Digits);
  }

}
