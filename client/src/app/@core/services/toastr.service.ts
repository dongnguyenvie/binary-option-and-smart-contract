import { Injectable } from '@angular/core';
import {
  NbComponentStatus,
  NbToastrService,
  NbIconConfig,
  NbToastrConfig,
} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: NbToastrService) {}

  showToast(
    title: string = '',
    message: string = '',
    status: NbComponentStatus = 'primary',
    userConfig: Partial<NbToastrConfig> = {
      hasIcon: false,
      icon: '',
    },
  ) {
    this.toastrService.show(message, title, {
      ...userConfig,
      status,
    });
  }
}
