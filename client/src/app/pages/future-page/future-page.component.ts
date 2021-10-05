import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from 'src/app/@theme/utils/layout.service';

@Component({
  templateUrl: './future-page.component.html',
  styleUrls: ['./future-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuturePageComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
}
