import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'future',
    loadChildren: () => import('./pages/future-page/future-page.module').then(m => m.FuturePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile-page/profile-page-routing.module').then(m => m.ProfilePageRoutingModule),
  },
  {
    path: '',
    redirectTo: 'future',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
