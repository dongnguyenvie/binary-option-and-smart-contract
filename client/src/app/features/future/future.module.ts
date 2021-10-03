import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureChatComponent } from './components/future-chat/future-chat.component';
import { FutureBetComponent } from './components/future-bet/future-bet.component';
import { FutureMonitorComponent } from './components/future-monitor/future-monitor.component';

@NgModule({
  declarations: [
    FutureChatComponent,
    FutureBetComponent,
    FutureMonitorComponent,
  ],
  exports: [FutureChatComponent, FutureBetComponent, FutureMonitorComponent],
  imports: [CommonModule],
})
export class FutureModule {}
