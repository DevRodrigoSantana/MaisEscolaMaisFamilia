import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Materia {
  nome: string;
  nota: number;
  faltas: number;
  aulasDadas: number;
}

export interface AlunoModel {
  nome: string;
  sala: string;
  statusNaEscola: boolean;
  totalAulasAnuais: number;
  materias: Materia[];
}

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno.html',
  styleUrls:[ './aluno.css'],
})
export class Aluno {

  
  aluno = signal<AlunoModel>({
    nome: 'João Silva',
    sala: '2B',
    statusNaEscola: true,
    totalAulasAnuais: 200,
    materias: [
      { nome: 'Matemática', nota: 8.5, faltas: 10, aulasDadas: 80 },
      { nome: 'Português', nota: 7.2, faltas: 5, aulasDadas: 75 },
      { nome: 'História', nota: 9.0, faltas: 2, aulasDadas: 70 },
      { nome: 'Geografia', nota: 6.5, faltas: 12, aulasDadas: 65 },
    ]
  });

  
  mediaGeral = computed(() => {
    const materias = this.aluno().materias;
    if (!materias.length) return '0.0';

    const soma = materias.reduce((acc, m) => acc + m.nota, 0);
    return (soma / materias.length).toFixed(1);
  });

  
  porcentagemFaltas(m: Materia): number {
    if (!m.aulasDadas) return 0;
    return Math.round((m.faltas / m.aulasDadas) * 100);
  }

  
  porcentagemPresenca(m: Materia): number {
    return 100 - this.porcentagemFaltas(m);
  }

  
  statusNota(nota: number): string {
    if (nota >= 7) return 'aprovado';
    if (nota >= 5) return 'recuperacao';
    return 'reprovado';
  }

  
  statusFalta(pct: number): string {
    if (pct <= 15) return 'ok';
    if (pct <= 25) return 'atencao';
    return 'critico';
  }

}