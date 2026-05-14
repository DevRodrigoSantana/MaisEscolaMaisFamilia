import { Injectable, signal, effect } from '@angular/core';

export interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class MuralService {

  private STORAGE_KEY = 'mural-db';

  avisos = signal<Aviso[]>(this.carregar());

  constructor() {

    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.avisos())
      );
    });

  }

  private carregar(): Aviso[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  }

  adicionar(aviso: Omit<Aviso, 'id' | 'data'>) {

    this.avisos.update(lista => [
      {
        id: Date.now(),
        titulo: aviso.titulo,
        descricao: aviso.descricao,
        data: new Date().toLocaleDateString()
      },
      ...lista
    ]);

  }

  editar(id: number, titulo: string, descricao: string) {

    this.avisos.update(lista =>
      lista.map(aviso =>
        aviso.id === id
          ? { ...aviso, titulo, descricao }
          : aviso
      )
    );

  }

  deletar(id: number) {

    this.avisos.update(lista =>
      lista.filter(a => a.id !== id)
    );

  }
}