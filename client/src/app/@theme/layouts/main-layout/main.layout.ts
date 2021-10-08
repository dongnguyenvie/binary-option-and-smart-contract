import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { filter } from 'rxjs';
import { MENU_ITEMS } from 'src/app/pages/pages-menu';

@Component({
  selector: 'main-layout',
  styleUrls: ['./main.layout.scss'],
  template: `
    <nb-layout class="main-layout" windowMode [ngClass]="{ trade: isFuturePage }">
      <nb-layout-header fixed>
        <app-header></app-header>
      </nb-layout-header>

      <nb-sidebar
        class="menu-sidebar"
        tag="menu-sidebar"
        [responsive]="!isFuturePage"
        [containerFixed]="isFuturePage"
        [state]="isFuturePage ? 'compacted' : 'expanded'"
      >
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class MainLayoutComponent {
  isFuturePage = false;
  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private cdr: ChangeDetectorRef,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isFuturePage =
          (event as NavigationEnd).url === MENU_ITEMS[0].link ||
          (event as NavigationEnd).urlAfterRedirects === MENU_ITEMS[0].link;
        if (this.isFuturePage) {
          setTimeout(() => {
            this.sidebarService.compact('menu-sidebar');
            this.cdr.detectChanges();
          }, 0);
        }
        this.cdr.detectChanges();
      });
  }
}
