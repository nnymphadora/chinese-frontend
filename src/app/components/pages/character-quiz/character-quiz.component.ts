import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import HanziWriter from 'hanzi-writer';

import { NewWord } from 'src/app/models/NewWord';

import { NewWordsService } from 'src/app/services/new-words.service';
import { QuizOptionsDialogComponent } from '../../helpers/quiz-options-dialog/quiz-options-dialog.component';

@Component({
  selector: 'app-character-quiz',
  templateUrl: './character-quiz.component.html',
  styleUrls: ['./character-quiz.component.scss'],
})
export class CharacterQuizComponent implements OnInit {
  chosenLessonId: number;
  noOfWords: number;
  randomNewWords: NewWord[];
  completedCharacters: number;

  ngOnInit(): void {
    this.handleUserChoice();
  }

  handleUserChoice() {
    const dialogRef = this.dialog.open(QuizOptionsDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chosenLessonId = result.selectedLessonId;
        this.noOfWords = result.noOfWords;
        this.newWordsService
          .getNewWordsByLesson(this.chosenLessonId)
          .subscribe((data) => {
            this.randomNewWords = this.getRandomWords(data, 5);
            console.log(this.randomNewWords);
            this.startQuiz();
          });
      }
    });
  }

  getRandomWords(words: NewWord[], count: number) {
    const shuffled = words.slice().sort(() => 0.5 - Math.random());
    let sliceAtIndex = count <= words.length ? count : words.length;
    return shuffled.slice(0, sliceAtIndex);
  }

  startQuiz() {
    console.log('Start quiz', this.randomNewWords);

    this.completedCharacters = 0;
    this.randomNewWords.forEach((word: any, index: number) => {
      this.initializeHanziWriterQuiz(word.content, index);
    });
  }

  initializeHanziWriterQuiz(character: string, index: number) {
    console.log('instanciram hanzi writer quiz', index);

    const targetDivId = 'quiz-target-div-' + index;

    const quizOptions = {
      width: 150,
      height: 150,
      showCharacter: false,
      showHintAfterMisses: 2,
      padding: 5,
      onComplete: (summaryData: any) => {
        const totalMistakes = summaryData.totalMistakes;
        console.log(
          `Total mistakes for character ${character}: ${totalMistakes}`
        );
        this.handleQuizCompleted();
      },
    };

    console.log(document.getElementById(targetDivId));

    const writer = HanziWriter.create(targetDivId, character, quizOptions);

    writer.quiz();
  }

  handleQuizCompleted() {
    this.completedCharacters++;

    if (this.completedCharacters === this.randomNewWords.length) {
      console.log('Game is finished!');
    }
  }

  constructor(
    private newWordsService: NewWordsService,
    private dialog: MatDialog
  ) {}
}
