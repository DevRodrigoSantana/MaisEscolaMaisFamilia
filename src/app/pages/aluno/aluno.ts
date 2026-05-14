import {
  Component,
  computed
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink,
  RouterLinkActive,
  Router
} from '@angular/router';

import {
  AlunosService,
  AlunoShared,
  Materia
} from '../../services/alunos.service';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './aluno.html',
  styleUrls: ['./aluno.css'],
})
export class Aluno {

  constructor(
    private router: Router,
    private alunosService: AlunosService
  ) {}

  /* MENU */

  menuAberto = false;

  /* ALUNO LOGADO */

  aluno = computed(() => {

    /*
      depois você pode trocar
      pelo ID salvo no login
    */

    return this
      .alunosService
      .alunos()[0];

  });

  /* MÉDIA */

  mediaGeral = computed(() => {

    const materias =
      this.aluno().materias;

    if (!materias.length) {

      return '0.0';
    }

    const soma =
      materias.reduce(

        (
          acc: number,
          m: Materia
        ) => acc + m.nota,

        0
      );

    return (
      soma / materias.length
    ).toFixed(1);

  });

  /* MENU */

  toggleMenu() {

    this.menuAberto =
      !this.menuAberto;
  }

  /* LOGOUT */

  logout() {

    localStorage.removeItem(
      'user'
    );

    this.router.navigate([
      '/login'
    ]);
  }

  /* FALTAS */

  porcentagemFaltas(
    m: Materia
  ): number {

    if (!m.aulasDadas) {

      return 0;
    }

    return Math.round(

      (
        m.faltas /
        m.aulasDadas
      ) * 100

    );
  }

  porcentagemPresenca(
    m: Materia
  ): number {

    return (
      100 -
      this.porcentagemFaltas(m)
    );
  }

  /* STATUS NOTA */

  statusNota(
    nota: number
  ): string {

    if (nota >= 7) {

      return 'aprovado';
    }

    if (nota >= 5) {

      return 'recuperacao';
    }

    return 'reprovado';
  }

  /* STATUS FALTA */

  statusFalta(
    pct: number
  ): string {

    if (pct <= 15) {

      return 'ok';
    }

    if (pct <= 25) {

      return 'atencao';
    }

    return 'critico';
  }

}