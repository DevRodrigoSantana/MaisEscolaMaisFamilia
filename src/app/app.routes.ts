import { Routes } from '@angular/router';

export const routes: Routes = [

 {
    path: '',
    loadComponent: () =>
      import('./pages/aluno/aluno').then(m => m.Aluno)
  },
  {
    path: 'professor',
    loadComponent: () =>
      import('./pages/professor/professor').then(m => m.Professor)
  }
];
