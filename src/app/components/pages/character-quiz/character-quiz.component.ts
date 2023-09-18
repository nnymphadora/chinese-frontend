import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import HanziWriter from 'hanzi-writer';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { NewWord } from 'src/app/models/NewWord';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { NewWordsService } from 'src/app/services/new-words.service';
import { QuizOptionsDialogComponent } from '../../helpers/quiz-options-dialog/quiz-options-dialog.component';

@Component({
  selector: 'app-character-quiz',
  templateUrl: './character-quiz.component.html',
  styleUrls: ['./character-quiz.component.scss'],
})
export class CharacterQuizComponent implements OnInit {
  chosenLessonId: Lesson;
  randomNewWords: NewWord[];

  ngOnInit(): void {
    this.handleDialog();
  }

  handleDialog() {
    const dialogRef = this.dialog.open(QuizOptionsDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chosenLessonId = result;
      }
    });
  }
  constructor(
    private newWordsService: NewWordsService,
    private dialog: MatDialog
  ) {}
}
