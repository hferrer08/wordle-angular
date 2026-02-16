import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlePage } from './wordle-page';

describe('WordlePage', () => {
  let component: WordlePage;
  let fixture: ComponentFixture<WordlePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordlePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordlePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
