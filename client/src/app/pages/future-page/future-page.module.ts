import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuturePageRoutingModule } from './future-page-routing.module';
import { FuturePageComponent } from './future-page.component';
import { FutureModule } from 'src/app/features/future/future.module';
import { LayoutService } from 'src/app/@theme/utils/layout.service';
import { NbButtonModule, NbListModule, NbSidebarModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';

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
