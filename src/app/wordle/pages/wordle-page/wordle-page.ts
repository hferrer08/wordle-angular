import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Board } from '../../components/board/board';
import Swal from 'sweetalert2';
import { WordleService } from '../../../app/wordle/services/wordle';

@Component({
  selector: 'app-wordle-page',
  standalone: true,
  imports: [Board],
  templateUrl: './wordle-page.html',
  styleUrls: ['./wordle-page.css'],
})
export class WordlePage {
  constructor(public game: WordleService, private cdr: ChangeDetectorRef) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.game.status !== 'playing') return;

    const key = event.key;

    if (/^[a-zA-Z]$/.test(key)) {
      this.game.typeLetter(key);
      return;
    }

    if (key === 'Backspace') {
      this.game.backspace();
      return;
    }

    if (key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      const result = this.game.submit(); // {status, solution} | null
      if (!result) return;

      if (result.status === 'won') {
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Ganaste! 🎉',
            text: `Adivinaste la palabra: ${result.solution}`,
            confirmButtonText: 'Nueva partida',
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            preConfirm: () => {
              this.game.newGame();
              queueMicrotask(() => this.cdr.detectChanges());
            },
          });
        }, 0);
      }

      if (result.status === 'lost') {
        setTimeout(() => {
          Swal.fire({
            icon: 'error',
            title: 'Perdiste 😢',
            text: `La palabra era: ${result.solution}`,
            confirmButtonText: 'Nueva partida',
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            preConfirm: () => {
              this.game.newGame();
              queueMicrotask(() => this.cdr.detectChanges());
            },
          });
        }, 0);
      }
    }
  }

  onNewGameClick() {
    this.game.newGame();
    this.cdr.detectChanges();
  }
}