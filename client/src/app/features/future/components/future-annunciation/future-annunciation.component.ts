import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition } from '@nebular/theme';
import { FutureSocketService } from 'src/app/@core/services/future-socket.service';
import { ToastService } from 'src/app/@core/services/toastr.service';
import { BetResult } from '../../future-bet.enum';

@Component({
  selector: 'app-future-annunciation',
  templateUrl: './future-annunciation.component.html',
  styleUrls: ['./future-annunciation.component.scss'],
})
export class FutureAnnunciationComponent implements OnInit, AfterViewInit {
  constructor(
    private futureSvc: FutureSocketService,
    private toastSvc: ToastService,
  ) {}

  ngAfterViewInit(): void {
    this.futureSvc.$betResultSubject.subscribe((result: any) => {
      if (result.betResult === BetResult.WIN) {
        this.toastSvc.showToast(`WIN`, `+${result.profit}`, 'success', {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        });
      } else {
        this.toastSvc.showToast(`LOSE`, `${result.profit}`, 'danger', {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        });
      }
      console.log('result', result);
    });
  }

  ngOnInit() {}
}
