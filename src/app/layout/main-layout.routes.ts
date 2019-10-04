import { Routes } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const MAIN_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './page/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'browse',
    loadChildren: './page/browse/browse.module#BrowseModule'
  },
];
