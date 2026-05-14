import { Component } from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';

  senha = '';

  erro = '';

  constructor(
    private router: Router
  ) {}

  entrar() {

    this.erro = '';

    /* PROFESSOR */

    if (
      this.email === 'professor@escola.com' &&
      this.senha === '123'
    ) {

      localStorage.setItem(
        'user',
        JSON.stringify({
          tipo: 'professor',
          nome: 'Professor'
        })
      );

      this.router.navigate(['/professor']);

      return;
    }

    /* PAI */

    if (
      this.email === 'pai@escola.com' &&
      this.senha === '123'
    ) {

      localStorage.setItem(
        'user',
        JSON.stringify({
          tipo: 'pai',
          nome: 'Responsável'
        })
      );

      this.router.navigate(['/']);

      return;
    }

    this.erro =
      'Email ou senha inválidos';
  }

}