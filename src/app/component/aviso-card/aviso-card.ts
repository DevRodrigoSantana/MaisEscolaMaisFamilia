import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

export interface Aviso {

  id: number;

  titulo: string;

  descricao: string;

  data: string;
}

@Component({
  selector: 'app-aviso-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aviso-card.html',
  styleUrls: ['./aviso-card.css']
})
export class AvisoCard {

  @Input()
  aviso!: Aviso;

  @Output()
  editar =
    new EventEmitter<number>();

  @Output()
  deletar =
    new EventEmitter<number>();

}