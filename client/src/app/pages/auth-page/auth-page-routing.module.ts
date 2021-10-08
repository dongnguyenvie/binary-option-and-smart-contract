import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { CanActivateAuth } from './guards/can-activate-auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    canActivate: [CanActivateAuth],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
