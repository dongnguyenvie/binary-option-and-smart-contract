import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureChatComponent } from './components/future-chat/future-chat.component';

@NgModule({
  declarations: [FutureChatComponent],
  exports: [FutureChatComponent],
  imports: [CommonModule],
})
export class FutureModule {}
