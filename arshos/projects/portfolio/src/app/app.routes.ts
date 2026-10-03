import { Routes } from '@angular/router';
import { OsContactPageComponent, OsHomeComponent } from './os/os-home.component';

export const routes: Routes = [
  { path: '', component: OsHomeComponent },
  { path: 'contact', component: OsContactPageComponent },
  { path: '**', redirectTo: '' },
];
