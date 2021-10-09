import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileModule } from 'src/app/features/profile/profile.module';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [ProfileModule, CommonModule, ProfilePageRoutingModule],
})
export class ProfilePageModule {}
