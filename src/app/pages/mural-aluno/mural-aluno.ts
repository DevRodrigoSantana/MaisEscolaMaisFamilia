import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuralService } from '../../services/mural.service';
import { AvisoView } from '../../component/aviso-view/aviso-view';

@Component({
  selector: 'app-mural-aluno',
  standalone: true,
  imports: [CommonModule, AvisoView],
  templateUrl: './mural-aluno.html',
  styleUrls: ['./mural-aluno.css']
})
export class MuralAluno {

  constructor(public mural: MuralService) {}

}