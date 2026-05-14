import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AlunosService, AlunoShared } from '../../services/alunos.service';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './professor.html',
  styleUrls: ['./professor.css']
})
export class Professor {

  constructor(
    private router: Router,
    private alunosService: AlunosService
  ) {}

  /* HEADER */
  menuAberto = false;
  materia = 'Matemática';

  /* ✅ SEM BUG */
 get alunos() {
  return this.alunosService.alunos;
}

  /* EDITOR */
  alunoSelecionado = signal<AlunoShared | null>(null);
  posicaoOriginal = signal<number | null>(null);

  selecionar(aluno: AlunoShared) {
    this.alunoSelecionado.set(structuredClone(aluno));
    this.posicaoOriginal.set(aluno.posicao);
  }

  salvar() {
    const aluno = this.alunoSelecionado();
    if (!aluno) return;

    const posOriginal = this.posicaoOriginal();

    this.alunos.update(lista => {

      const conflito = lista.find(
        a => a.posicao === aluno.posicao && a.id !== aluno.id
      );

      return lista.map(a => {

        if (a.id === aluno.id) {
          return structuredClone(aluno);
        }

        if (conflito && a.id === conflito.id) {
          return {
            ...a,
            posicao: posOriginal ?? a.posicao
          };
        }

        return a;
      })
      .sort((a, b) => a.posicao - b.posicao);
    });

    this.alunoSelecionado.set(null);
    this.posicaoOriginal.set(null);
  }

  /* MENU */
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /* MATEMÁTICA */
  notaMatematica(a: AlunoShared) {
    return a.materias.find(m => m.nome === 'Matemática')?.nota ?? 0;
  }

  faltasMatematica(a: AlunoShared) {
    return a.materias.find(m => m.nome === 'Matemática')?.faltas ?? 0;
  }

  atualizarNota(valor: number) {
    const aluno = this.alunoSelecionado();
    if (!aluno) return;

    aluno.materias = aluno.materias.map(m =>
      m.nome === 'Matemática'
        ? { ...m, nota: valor }
        : m
    );

    this.alunoSelecionado.set(structuredClone(aluno));
  }

  atualizarFaltas(valor: number) {
    const aluno = this.alunoSelecionado();
    if (!aluno) return;

    aluno.materias = aluno.materias.map(m =>
      m.nome === 'Matemática'
        ? { ...m, faltas: valor }
        : m
    );

    this.alunoSelecionado.set(structuredClone(aluno));
  }

  /* STATUS */
  statusNota(nota: number) {
    if (nota >= 7) return 'aprovado';
    if (nota >= 5) return 'recuperacao';
    return 'reprovado';
  }

  /* ORDENAÇÃO */
  alunosOrdenados = computed(() =>
    this.alunos().slice().sort((a, b) => a.posicao - b.posicao)
  );


  linhas() {
  const lista = this.alunosOrdenados();
  const resultado: (AlunoShared | null)[][] = [];

  for (let i = 0; i < lista.length; i += 3) {
    resultado.push(lista.slice(i, i + 3));
  }

  return resultado;
}
}