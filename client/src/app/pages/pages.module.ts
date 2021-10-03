import { NgModule } from '@angular/core';
import { NbMenuModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule],
  declarations: [PagesComponent],
  providers: [
    {
      provide: NB_TIME_PICKER_CONFIG,
      useValue: {},
    },
  ],
})
export class PagesModule {}
