import { Injectable } from '@angular/core';

type TileState = 'empty' | 'correct' | 'present' | 'absent';
type Tile = { letter: string; state: TileState };
type GameStatus = 'playing' | 'won' | 'lost';

@Injectable({ providedIn: 'root' })
export class WordleService {
  readonly words = [
    'CASAS','PERRO','GATOS','ARBOL','PLAYA','CIELO','FUEGO','AGUAS','SILLA','VASOS',
    'LIBRO','LAPIZ','PLAZA','CALOR','LIMON','MANGO','CANTO','RISAS','SALSA','PESCA',
    'BARCO','RUMBA','AREPA','HUEVO','DULCE','NIEVE','AVION','COCHE','RATON','ZORRO',
    'OSITO','PANDA','VERDE','NEGRO','ROJOS','AMBAR','TRIGO','CAFES','CACAO','TIGRE',
    'LEONA','LLAVE','PATIO','CAMPO','MONTE','RANGO','NADAR','CORRE','SALTA','BAILA',
    'SABER','VIVIR','GANAR','HUMOR','FELIZ','GRUPO','NOCHE','MEDIA','FORMA','LUGAR',
    'PLENO','VIAJE','SUELO','LUCES',
  ];

  readonly validWords = this.words
    .map(w => w.toUpperCase())
    .filter(w => /^[A-Z]{5}$/.test(w));

  grid: Tile[][] = this.createGrid();
  activeRow = 0;
  activeCol = 0;
  status: GameStatus = 'playing';
  solution!: string;

  constructor() {
    this.newGame();
  }

  newGame() {
    this.grid = this.createGrid();
    this.activeRow = 0;
    this.activeCol = 0;
    this.status = 'playing';
    this.solution = this.validWords[Math.floor(Math.random() * this.validWords.length)];
  }

  typeLetter(letter: string) {
    if (this.status !== 'playing') return;
    if (this.activeCol >= 5) return;

    this.grid[this.activeRow][this.activeCol].letter = letter.toUpperCase();
    this.activeCol++;
  }

  backspace() {
    if (this.status !== 'playing') return;
    if (this.activeCol === 0) return;

    this.activeCol--;
    this.grid[this.activeRow][this.activeCol] = { letter: '', state: 'empty' };
  }

  submit(): { status: GameStatus; solution: string } | null {
    if (this.status !== 'playing') return null;
    if (this.activeCol < 5) return null;

    const guessTiles = this.grid[this.activeRow];
    const guess = guessTiles.map(t => t.letter).join('').toUpperCase();

    const result = this.evaluateGuess(guess, this.solution);

    for (let i = 0; i < 5; i++) {
      this.grid[this.activeRow][i].state = result[i];
    }

    if (result.every(s => s === 'correct')) {
      this.status = 'won';
      return { status: this.status, solution: this.solution };
    }

    if (this.activeRow === 5) {
      this.status = 'lost';
      return { status: this.status, solution: this.solution };
    }

    this.activeRow++;
    this.activeCol = 0;
    return { status: this.status, solution: this.solution };
  }

  private evaluateGuess(guess: string, solution: string): TileState[] {
    const res: TileState[] = Array(5).fill('absent');

    const sol = solution.split('');
    const g = guess.split('');

    for (let i = 0; i < 5; i++) {
      if (g[i] === sol[i]) {
        res[i] = 'correct';
        sol[i] = '';
        g[i] = '*';
      }
    }

    for (let i = 0; i < 5; i++) {
      if (res[i] === 'correct') continue;
      const idx = sol.indexOf(g[i]);
      if (idx !== -1) {
        res[i] = 'present';
        sol[idx] = '';
      }
    }

    return res;
  }

  private createGrid(): Tile[][] {
    return Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: '', state: 'empty' as TileState }))
    );
  }
}