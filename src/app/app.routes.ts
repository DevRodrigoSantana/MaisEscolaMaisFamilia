import { Routes } from '@angular/router';

import { authGuard } from '../app/guards/auth-guard';

export const routes: Routes = [

  /* LOGIN */

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },

  /* ALUNO / PAI */

  {
    path: '',
    canActivate: [authGuard],
    data: {
      role: 'pai'
    },
    loadComponent: () =>
      import('./pages/aluno/aluno')
        .then(m => m.Aluno)
  },

  /* MURAL ALUNO */

  {
    path: 'mural-aluno',
    canActivate: [authGuard],
    data: {
      role: 'pai'
    },
    loadComponent: () =>
      import('./pages/mural-aluno/mural-aluno')
        .then(m => m.MuralAluno)
  },

  /* PROFESSOR */

  {
    path: 'professor',
    canActivate: [authGuard],
    data: {
      role: 'professor'
    },
    loadComponent: () =>
      import('./pages/professor/professor')
        .then(m => m.Professor)
  },

  /* MURAL PROFESSOR */

  {
    path: 'mural',
    canActivate: [authGuard],
    data: {
      role: 'professor'
    },
    loadComponent: () =>
      import('./pages/mural/mural')
        .then(m => m.Mural)
  },

  /* FALLBACK */

  {
    path: '**',
    redirectTo: 'login'
  }

];