import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuturePageComponent } from './future-page.component';

const routes: Routes = [
  {
    path: '',
    component: FuturePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuturePageRoutingModule {}
