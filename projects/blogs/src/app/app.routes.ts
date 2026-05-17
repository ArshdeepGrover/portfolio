import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'post/:slug',
    loadComponent: () =>
      import('./components/post/post.component').then((m) => m.PostComponent),
  },
  {
    path: 'tags/:slug',
    loadComponent: () =>
      import('./components/tags/tags.component').then((m) => m.TagsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
