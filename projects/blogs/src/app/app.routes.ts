import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./components/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
