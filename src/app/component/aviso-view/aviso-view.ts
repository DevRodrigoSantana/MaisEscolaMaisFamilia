import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Aviso } from '../../services/mural.service';

@Component({
  selector: 'app-aviso-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aviso-view.html',
  styleUrls: ['./aviso-view.css'] 
})
export class AvisoView {
  @Input() aviso!: Aviso;
}