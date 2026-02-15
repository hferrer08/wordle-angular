import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
})
export class Board {
  // 6 filas x 5 columnas (vacías por ahora)
  grid: string[][] = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => '')
  );
}