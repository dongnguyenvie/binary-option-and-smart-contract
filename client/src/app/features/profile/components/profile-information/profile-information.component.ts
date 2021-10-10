import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
})
export class ProfileInformationComponent implements OnInit {
  profile = this.accountService.profile;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    // this.accountService.refreshProfile();
    console.log('profile', this.profile);
  }
}
