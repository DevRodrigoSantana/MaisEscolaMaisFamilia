import {
  Injectable,
  signal,
  effect
} from '@angular/core';

export interface Materia {

  nome: string;

  nota: number;

  faltas: number;

  aulasDadas: number;
}

export interface AlunoShared {

  id: number;

  nome: string;

  naEscola: boolean;

  posicao: number;

  sala: string;

  totalAulasAnuais: number;

  materias: Materia[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private STORAGE_KEY =
    'alunos-db';

  alunos = signal<AlunoShared[]>(

    this.carregar()

  );

  constructor() {

    /* salva automaticamente */

    effect(() => {

      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          this.alunos()
        )

      );

    });

    /* sincroniza entre abas */

    window.addEventListener(

      'storage',

      (event) => {

        if (

          event.key ===
          this.STORAGE_KEY

          &&

          event.newValue

        ) {

          this.alunos.set(

            JSON.parse(
              event.newValue
            )

          );

        }

      }

    );

  }

  carregar(): AlunoShared[] {

    const dados =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (dados) {

      return JSON.parse(dados);
    }

    return this.alunosPadrao();
  }

  alunosPadrao(): AlunoShared[] {

    return [

      {
        id: 1,
        nome: 'Ana',
        naEscola: true,
        posicao: 1,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 8,
            faltas: 2,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 7,
            faltas: 1,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 9,
            faltas: 0,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 8,
            faltas: 2,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 10,
            faltas: 1,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 2,
        nome: 'Bruno',
        naEscola: true,
        posicao: 2,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 6,
            faltas: 5,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 5,
            faltas: 3,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 7,
            faltas: 2,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 6,
            faltas: 4,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 8,
            faltas: 1,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 3,
        nome: 'Carlos',
        naEscola: false,
        posicao: 3,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 4,
            faltas: 10,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 6,
            faltas: 8,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 5,
            faltas: 7,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 4,
            faltas: 9,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 5,
            faltas: 6,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 4,
        nome: 'Daniela',
        naEscola: true,
        posicao: 4,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 9,
            faltas: 1,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 8,
            faltas: 1,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 9,
            faltas: 0,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 10,
            faltas: 0,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 9,
            faltas: 1,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 5,
        nome: 'Eduarda',
        naEscola: true,
        posicao: 5,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 7,
            faltas: 3,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 8,
            faltas: 2,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 6,
            faltas: 3,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 7,
            faltas: 2,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 8,
            faltas: 2,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 6,
        nome: 'Felipe',
        naEscola: true,
        posicao: 6,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 5,
            faltas: 6,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 6,
            faltas: 4,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 5,
            faltas: 5,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 6,
            faltas: 6,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 7,
            faltas: 3,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 7,
        nome: 'Gabriel',
        naEscola: false,
        posicao: 7,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 3,
            faltas: 12,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 4,
            faltas: 9,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 5,
            faltas: 10,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 4,
            faltas: 8,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 3,
            faltas: 11,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 8,
        nome: 'Helena',
        naEscola: true,
        posicao: 8,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 10,
            faltas: 0,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 9,
            faltas: 1,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 10,
            faltas: 0,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 9,
            faltas: 1,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 10,
            faltas: 0,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 9,
        nome: 'Igor',
        naEscola: true,
        posicao: 9,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 6,
            faltas: 4,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 7,
            faltas: 2,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 6,
            faltas: 3,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 7,
            faltas: 4,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 8,
            faltas: 2,
            aulasDadas: 60
          }

        ]
      },

      {
        id: 10,
        nome: 'Julia',
        naEscola: true,
        posicao: 10,
        sala: '2B',
        totalAulasAnuais: 200,

        materias: [

          {
            nome: 'Matemática',
            nota: 8,
            faltas: 2,
            aulasDadas: 80
          },

          {
            nome: 'Português',
            nota: 9,
            faltas: 1,
            aulasDadas: 75
          },

          {
            nome: 'História',
            nota: 8,
            faltas: 2,
            aulasDadas: 70
          },

          {
            nome: 'Geografia',
            nota: 9,
            faltas: 1,
            aulasDadas: 65
          },

          {
            nome: 'Ciências',
            nota: 8,
            faltas: 2,
            aulasDadas: 60
          }

        ]
      }

    ];

  }

}