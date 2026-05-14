import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Aluno {
  id: number;
  nome: string;
  nota: number;
  faltas: number;
  naEscola: boolean;
  posicao: number;
}

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.html',
  styleUrls: ['./professor.css']
})
export class Professor {

  materia = 'Matemática';

  alunos = signal<Aluno[]>([
    { id: 1, nome: 'Ana', nota: 8, faltas: 2, naEscola: true, posicao: 1 },
    { id: 2, nome: 'Bruno', nota: 6, faltas: 5, naEscola: true, posicao: 2 },
    { id: 3, nome: 'Carlos', nota: 4, faltas: 10, naEscola: false, posicao: 3 },
    { id: 4, nome: 'Daniela', nota: 9, faltas: 1, naEscola: true, posicao: 4 },
    { id: 5, nome: 'Eduarda', nota: 7, faltas: 3, naEscola: true, posicao: 5 },
    { id: 6, nome: 'Felipe', nota: 5, faltas: 6, naEscola: true, posicao: 6 },
    { id: 7, nome: 'Gabriel', nota: 3, faltas: 12, naEscola: false, posicao: 7 },
    { id: 8, nome: 'Helena', nota: 10, faltas: 0, naEscola: true, posicao: 8 },
    { id: 9, nome: 'Igor', nota: 6, faltas: 4, naEscola: true, posicao: 9 },
    { id: 10, nome: 'Julia', nota: 8, faltas: 2, naEscola: true, posicao: 10 },
  ]);

  alunoSelecionado = signal<Aluno | null>(null);

  // 🔥 guarda posição original
  posicaoOriginal = signal<number | null>(null);

  selecionar(aluno: Aluno) {
    this.alunoSelecionado.set({ ...aluno }); // cópia (importante!)
    this.posicaoOriginal.set(aluno.posicao);
  }

  salvar() {
    const aluno = this.alunoSelecionado();
    if (!aluno) return;

    const posOriginal = this.posicaoOriginal();

    this.alunos.update(lista => {

      // 🔍 verifica se já existe alguém na posição nova
      const conflito = lista.find(
        a => a.posicao === aluno.posicao && a.id !== aluno.id
      );

      return lista
        .map(a => {

          // atualiza aluno editado
          if (a.id === aluno.id) return { ...aluno };

          // 🔄 troca posição com o outro aluno
          if (conflito && a.id === conflito.id) {
            return {
              ...a,
              posicao: posOriginal ?? a.posicao
            };
          }

          return a;
        })
        .sort((a, b) => a.posicao - b.posicao); // 🔥 reordena
    });

    alert('Alterações salvas!');
    this.alunoSelecionado.set(null);
    this.posicaoOriginal.set(null);
  }

  linhas() {
    const lista = this.alunosOrdenados();
    const resultado = [];

    for (let i = 0; i < lista.length; i += 4) {
      const linha = lista.slice(i, i + 4);

      while (linha.length < 4) {
        linha.push(null as any);
      }

      resultado.push(linha);
    }

    return resultado;
  }

  statusNota(nota: number) {
    if (nota >= 7) return 'aprovado';
    if (nota >= 5) return 'recuperacao';
    return 'reprovado';
  }

  alunosOrdenados = computed(() =>
    [...this.alunos()].sort((a, b) => a.posicao - b.posicao)
  );
}