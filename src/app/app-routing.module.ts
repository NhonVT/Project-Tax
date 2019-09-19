import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { MAIN_ROUTES } from './layout/main-layout.routes';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: MAIN_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
