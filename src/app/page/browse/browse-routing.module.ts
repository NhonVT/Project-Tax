import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse.component';

const routes: Routes = [
  {
    path: '',
    component: BrowseComponent,
    data: {
      title: 'Browse'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BrowseRoutingModule { }
