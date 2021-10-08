import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { LayoutService } from 'src/app/@theme/utils/layout.service';
import { AccountService } from 'src/app/@core/services/account.service';
import { WalletConnectService } from 'src/app/@core/services/wallet-connect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FutureSocketService } from 'src/app/@core/services/future-socket.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  $user: Observable<any> = this.accountService.getUser();
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  $isMetamaskInstall = this.walletConnectService.isMetamaskInstall;
  $accountSelected = this.walletConnectService.accountSelected;
  $balance: Observable<any> = this.walletConnectService.balanceAccountSelected;
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private walletConnectService: WalletConnectService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private futureSocketService: FutureSocketService,
  ) {}

  ngOnInit() {
    this.walletConnectService.listenAccountChange.subscribe(data => {});

    this.menuService
      .onItemClick()
      .pipe()
      .subscribe(title => {
        if (title.item.title === 'Log out') {
          this.accountService.logout();
          this.futureSocketService.disconnect();
          this.router.navigate(['/auth/login'], {
            relativeTo: this.route,
          });
        }
      });
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl),
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  requestConnectMetamask() {
    this.walletConnectService.connectAccount();
  }
}
