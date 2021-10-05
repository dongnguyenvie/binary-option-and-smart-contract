import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureChatComponent } from './components/future-chat/future-chat.component';
import { FutureBetComponent } from './components/future-bet/future-bet.component';
import { FutureMonitorComponent } from './components/future-monitor/future-monitor.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
} from '@nebular/theme';
import { IsTypeNumberDirective } from './directives/isTypeNumber.directive';

@NgModule({
  declarations: [
    FutureChatComponent,
    FutureBetComponent,
    FutureMonitorComponent,
    IsTypeNumberDirective
  ],
  exports: [FutureChatComponent, FutureBetComponent, FutureMonitorComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    NbIconModule,
    NbCardModule,
  ],
})
export class FutureModule {}
