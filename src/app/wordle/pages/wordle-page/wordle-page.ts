import { Component, HostListener } from '@angular/core';
import { Board } from '../../components/board/board';

@Component({
  selector: 'app-wordle-page',
  standalone: true,
  imports: [Board],
  templateUrl: './wordle-page.html',
  styleUrls: ['./wordle-page.css'],
})
export class WordlePage {
  grid: string[][] = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ''));
  activeRow = 0;
  activeCol = 0;

  //Como un addEventListener global para capturar las teclas presionadas
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    // Letras A-Z
    if (/^[a-zA-Z]$/.test(key)) {
      this.typeLetter(key.toUpperCase());
      return;
    }

    if (key === 'Backspace') {
      this.backspace();
      return;
    }

    if (key === 'Enter') {
      this.submit();
      return;
    }
  }

  private typeLetter(letter: string) {
    if (this.activeCol >= 5) return;
    this.grid[this.activeRow][this.activeCol] = letter;
    this.activeCol++;
  }

  private backspace() {
    if (this.activeCol === 0) return;
    this.activeCol--;
    this.grid[this.activeRow][this.activeCol] = '';
  }

  private submit() {
    // por ahora solo “pasa de fila” si la fila está completa
    if (this.activeCol < 5) return;

    if (this.activeRow < 5) {
      this.activeRow++;
      this.activeCol = 0;
    }
  }
}