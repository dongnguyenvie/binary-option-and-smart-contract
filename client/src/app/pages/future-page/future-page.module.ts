import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuturePageRoutingModule } from './future-page-routing.module';
import { FuturePageComponent } from './future-page.component';
import { FutureModule } from 'src/app/features/future/future.module';

@NgModule({
  declarations: [FuturePageComponent],
  imports: [FutureModule, CommonModule, FuturePageRoutingModule],
})
export class FuturePageModule {}
