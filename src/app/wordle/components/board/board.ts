import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
})
export class Board {
  @Input({ required: true }) grid!: { letter: string; state: 'empty' | 'correct' | 'present' | 'absent' }[][];
  @Input() activeRow = 0;
}