import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import HanziWriter from 'hanzi-writer';

import { NewWord } from 'src/app/models/NewWord';

import { NewWordsService } from 'src/app/services/new-words.service';
import { QuizOptionsDialogComponent } from '../../helpers/quiz-options-dialog/quiz-options-dialog.component';
import { PronunciationService } from 'src/app/services/pronunciation.service';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

import { ConfirmDialogComponent } from '../../helpers/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  message: string;

  soundIcon = faVolumeHigh;

  ngOnInit(): void {
    this.handleUserChoice();
  }

  handleUserChoice() {
    const dialogRef = this.dialog.open(QuizOptionsDialogComponent, {
      panelClass: 'custom-quiz-dialog-width',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chosenLessonId = result.selectedLessonId;
        this.noOfWords = result.noOfWords;
        this.newWordsService
          .getNewWordsByLesson(this.chosenLessonId)
          .subscribe((data) => {
            this.randomNewWords = this.getRandomWords(data, this.noOfWords);
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
    this.completedCharacters = 0;
    this.randomNewWords.forEach((word: any, index: number) => {
      this.initializeHanziWriterQuiz(word.content, index);
    });
  }

  initializeHanziWriterQuiz(character: string, index: number) {
    const targetDivId = 'quiz-target-div-' + index;

    const quizOptions = {
      width: 150,
      height: 150,
      showCharacter: false,
      showHintAfterMisses: 2,
      padding: 5,
      onComplete: (summaryData: any) => {
        const totalMistakes = summaryData.totalMistakes;
        const messageDivId = 'message-' + index;
        let message: string;
        if (totalMistakes === 0) {
          message = 'Odlično, bez greške!';
        } else if (totalMistakes < 5) {
          message = `Bravo! Samo ${totalMistakes} greške na karakteru ${character}!`;
        } else {
          message = `Ukupno ${totalMistakes} grešaka na karakteru ${character}.`;
        }
        document.getElementById(messageDivId).innerText = message;
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
      this.handleGameOver();
    }
  }

  playPronunciation(newWord: NewWord) {
    this.pronunciationService
      .getPronunciation(newWord.content)
      .subscribe((data) => {
        const audioUrl = data.items[0].pathmp3;
        const audio = new Audio(audioUrl);
        audio.play();
      });
  }

  handleGameOver() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-confirm-dialog-width',

      data: {
        message:
          'Svi zadaci su riješeni! Da li želiš da nastaviš vježbanje karaktera?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        window.location.reload();
      } else {
        this.router.navigateByUrl('/exercises');
      }
    });
  }

  constructor(
    private newWordsService: NewWordsService,
    private dialog: MatDialog,
    private pronunciationService: PronunciationService,
    private router: Router
  ) {}
}
