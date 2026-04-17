import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  {
    path: 'start-project',
    loadComponent: () =>
      import('./components/submit-project/submit-project.component').then(
        (m) => m.SubmitProjectComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
