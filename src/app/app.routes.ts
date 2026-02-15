import { Routes } from '@angular/router';
import { WordlePage } from './wordle/pages/wordle-page/wordle-page';


export const routes: Routes = [
  { path: '', redirectTo: 'wordle', pathMatch: 'full' },
  { path: 'wordle', component: WordlePage },
  { path: '**', redirectTo: 'wordle' },
];
