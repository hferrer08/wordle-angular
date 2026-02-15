import { Component } from '@angular/core';
import { Board } from '../../components/board/board';

@Component({
  selector: 'app-wordle-page',
  imports: [Board],
  templateUrl: './wordle-page.html',
  styleUrl: './wordle-page.css',
})
export class WordlePage {

}
