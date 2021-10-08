import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuturePageRoutingModule } from './future-page-routing.module';
import { FuturePageComponent } from './future-page.component';
import { NbButtonModule, NbListModule, NbSidebarModule } from '@nebular/theme';
import { FutureModule } from '../../features/future/future.module';

@NgModule({
  declarations: [FuturePageComponent],
  imports: [
    FutureModule,
    CommonModule,
    FuturePageRoutingModule,
    NbButtonModule,
    NbListModule,
  ],
})
export class FuturePageModule {}
