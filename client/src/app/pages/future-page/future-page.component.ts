import { ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';

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
