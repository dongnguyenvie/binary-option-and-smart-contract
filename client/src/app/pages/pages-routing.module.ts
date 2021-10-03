import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'future',
        pathMatch: 'full',
      },
      {
        path: 'future',
        loadChildren: () =>
          import('./future-page/future-page.module').then(
            m => m.FuturePageModule,
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile-page/profile-page-routing.module').then(
            m => m.ProfilePageRoutingModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
