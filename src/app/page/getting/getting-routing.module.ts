import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettingComponent } from './getting.component';

const routes: Routes = [
  {
    path: '',
    component: GettingComponent,
    data: {
      title: 'Getting'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class GettingRoutingModule { }
