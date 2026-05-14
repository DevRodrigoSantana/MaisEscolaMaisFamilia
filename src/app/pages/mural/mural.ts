import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MuralService } from '../../services/mural.service';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mural.html',
  styleUrls: ['./mural.css']
})
export class Mural {

  titulo = '';
  descricao = '';
  editandoId: number | null = null;

  constructor(public mural: MuralService) {}

  criarAviso() {

    if (!this.titulo.trim() || !this.descricao.trim()) return;

    if (this.editandoId) {

      this.mural.editar(
        this.editandoId,
        this.titulo,
        this.descricao
      );

      this.editandoId = null;

    } else {

      this.mural.adicionar({
        titulo: this.titulo,
        descricao: this.descricao
      });

    }

    this.titulo = '';
    this.descricao = '';
  }

  editarAviso(id: number) {

    const aviso = this.mural.avisos().find(a => a.id === id);

    if (!aviso) return;

    this.titulo = aviso.titulo;
    this.descricao = aviso.descricao;
    this.editandoId = aviso.id;
  }

  deletarAviso(id: number) {
    this.mural.deletar(id);
  }
}