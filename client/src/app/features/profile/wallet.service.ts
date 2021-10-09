import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  NbComponentStatus,
  NbToastrService,
  NbIconConfig,
  NbToastrConfig,
} from '@nebular/theme';

@Injectable()
export class WalletService {
  constructor(private http: HttpClient) {}

  createWallet(address: string, ) {

  }
}
