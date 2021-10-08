import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from 'src/app/@core/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateAuth implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService.getUser().pipe(
      map(user => {
        console.log(user);

        if (user && user.email) {
          this.router.navigate(['/pages/']);
          return false;
        }
        return true;
      }),
    );
  }
}
