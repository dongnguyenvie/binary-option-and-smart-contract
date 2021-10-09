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
import { FutureOrderService } from './future-order.service';
import { FormsModule } from '@angular/forms';
import { FutureAnnunciationComponent } from './components/future-annunciation/future-annunciation.component';
@NgModule({
  declarations: [
    FutureChatComponent,
    FutureBetComponent,
    FutureMonitorComponent,
    FutureAnnunciationComponent,
    IsTypeNumberDirective,
  ],
  exports: [
    FutureChatComponent,
    FutureBetComponent,
    FutureMonitorComponent,
    FutureAnnunciationComponent,
  ],
  providers: [FutureOrderService],
  imports: [
    CommonModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    NbIconModule,
    NbCardModule,
    FormsModule,
  ],
})
export class FutureModule {}
