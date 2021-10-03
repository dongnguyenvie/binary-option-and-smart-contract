import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { AuthRoutes } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [AuthPageComponent, LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbAlertModule,
    AuthRoutes,
  ],
})
export class AuthModule {}
