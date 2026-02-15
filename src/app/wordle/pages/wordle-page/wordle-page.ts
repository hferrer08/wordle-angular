import { Component, HostListener } from '@angular/core';
import { Board } from '../../components/board/board';

type TileState = 'empty' | 'correct' | 'present' | 'absent';

type Tile = {
  letter: string;
  state: TileState;
};


@Component({
  selector: 'app-wordle-page',
  standalone: true,
  imports: [Board],
  templateUrl: './wordle-page.html',
  styleUrls: ['./wordle-page.css'],
})


export class WordlePage {
  grid: Tile[][] = Array.from({ length: 6 }, () =>
  Array.from({ length: 5 }, () => ({ letter: '', state: 'empty' as TileState }))
);

  activeRow = 0;
  activeCol = 0;

  solution: string = 'CASAS'
  status: 'playing' | 'won' | 'lost' = 'playing';
  

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

    this.grid[this.activeRow][this.activeCol].letter = letter;
    // si estaba vacío, se mantiene state en 'empty' hasta que validemos
    this.activeCol++;
  }

  private backspace() {
    if (this.activeCol === 0) return;

    this.activeCol--;
    this.grid[this.activeRow][this.activeCol] = { letter: '', state: 'empty' };
  }

  private evaluateGuess(guess: string, solution: string): TileState[] {
  const res: TileState[] = Array(5).fill('absent');

  const sol = solution.split('');
  const g = guess.split('');

  // 1) marcar correct (verdes) y "consumir" esas letras en la solución
  for (let i = 0; i < 5; i++) {
    if (g[i] === sol[i]) {
      res[i] = 'correct';
      sol[i] = ''; // consumida
      g[i] = '*';  // marcada
    }
  }

  // 2) marcar present (amarillos) si la letra existe aún disponible
  for (let i = 0; i < 5; i++) {
    if (res[i] === 'correct') continue;
    const idx = sol.indexOf(g[i]);
    if (idx !== -1) {
      res[i] = 'present';
      sol[idx] = ''; // consumir esa ocurrencia
    }
  }

  return res;
}

  private submit() {
  if (this.status !== 'playing') return;
  if (this.activeCol < 5) return;

  const guessTiles = this.grid[this.activeRow];
  const guess = guessTiles.map(t => t.letter).join('');

  const result = this.evaluateGuess(guess, this.solution);

  // aplicar estados a la fila actual
  for (let i = 0; i < 5; i++) {
    this.grid[this.activeRow][i].state = result[i];
  }

  // win/lose
  if (result.every(s => s === 'correct')) {
    this.status = 'won';
    return;
  }

  if (this.activeRow === 5) {
    this.status = 'lost';
    return;
  }

  // seguir a la siguiente fila
  this.activeRow++;
  this.activeCol = 0;
}
}