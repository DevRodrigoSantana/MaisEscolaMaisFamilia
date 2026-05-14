import {
  CanActivateFn,
  Router
} from '@angular/router';

import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route
) => {

  const router = inject(Router);

  const user = localStorage.getItem('user');

  if (!user) {

    router.navigate(['/login']);

    return false;
  }

  const data = JSON.parse(user);

  const tipoEsperado =
    route.data?.['role'];

  if (
    tipoEsperado &&
    data.tipo !== tipoEsperado
  ) {

    router.navigate(['/login']);

    return false;
  }

  return true;
};