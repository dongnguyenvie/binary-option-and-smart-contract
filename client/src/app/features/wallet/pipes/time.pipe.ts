import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'src/app/@core/libs/dayjs';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return dayjs(value).format('DD/MM/YYYY HH:mm:ss');
  }
}
