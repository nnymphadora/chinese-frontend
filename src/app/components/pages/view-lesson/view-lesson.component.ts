import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { Lesson } from 'src/app/models/Lesson';
import { NewWordsService } from 'src/app/services/new-words.service';
import { NewWord } from 'src/app/models/NewWord';
import { Level } from 'src/app/models/Level';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from 'src/app/services/levels.service';
import {
  IconDefinition,
  faArrowAltCircleRight,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EditNewWordComponent } from '../../admin/edit-new-word/edit-new-word.component';
import { AddEditLessonComponent } from '../../admin/add-edit-lesson/add-edit-lesson.component';
import { DialogResult } from 'src/app/enums/dialog-result';
import { ConfirmDialogComponent } from '../../helpers/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';
import { SnackbarMessage } from 'src/app/enums/snackbar-message';
@Component({
  selector: 'app-view-words-for-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.scss'],
})
export class ViewLessonComponent implements OnInit {
  newWords: NewWord[];
  lesson: Lesson;
  lessonId: number;
  level: Level;

  isActiveLesson: boolean;

  rightArrow = faArrowAltCircleRight;
  editIcon: IconDefinition = faPenToSquare;
  deleteIcon: IconDefinition = faTrashCan;
  snackbarClasses: string[] = ['snackbar', 'snackbar-blue', 'no-action'];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.activatedRoute.params.subscribe((paramsData) => {
      this.lessonId = paramsData['id'];
      this.getNewWordsData(this.lessonId);
      this.getLessonData(this.lessonId);
    });
  }

  getNewWordsData(lessonId: number) {
    this.newWordsService
      .getNewWordsByLesson(lessonId)
      .subscribe((data) => (this.newWords = data));
  }
  getLessonData(lessonId: number) {
    this.lessonsService.getLessonById(lessonId).subscribe((data) => {
      this.lesson = data;
      this.isActiveLesson = !!this.lesson.isActive;
      const levelId = this.lesson.levelId;
      this.getLevelData(levelId);
    });
  }

  getLevelData(levelId: number) {
    this.levelsService
      .getLevelById(levelId)
      .subscribe((data) => (this.level = data));
  }

  onSoftDeleteLesson() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Obriši lekciju?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.lessonsService
          .softDeleteLesson(this.lesson)
          .subscribe((data: any) => {
            const message = data.success
              ? SnackbarMessage.Success
              : SnackbarMessage.Error;
            const snackbarClasses = ['snackbar', 'snackbar-pink', 'no-action'];
            this.snackBarService.openSnackBar(
              message,
              undefined,
              snackbarClasses,
              3000
            );
            if (data.success) {
              this.router.navigateByUrl(`/level/${this.lesson.levelId}`);
            }
          });
      }
    });
  }

  toggleActiveLesson(toggleActive: number) {
    this.lessonsService
      .toggleActiveLesson(this.lesson.id, toggleActive)
      .subscribe(() => {
        this.getLessonData(this.lesson.id);
      });
  }

  handleToggle(value: boolean) {
    const val = value ? 1 : 0;

    this.toggleActiveLesson(val);
  }

  onDeleteWord(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Obriši riječ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newWordsService.deleteNewWord(id).subscribe((data: any) => {
          console.log(data);

          const message = data.success
            ? SnackbarMessage.Success
            : SnackbarMessage.Error;

          console.log(message);

          this.snackBarService.openSnackBar(
            message,
            undefined,
            this.snackbarClasses,
            3000
          );
          if (data.result.affectedRows > 0) {
            this.getNewWordsData(this.lesson.id);
          }
        });
      }
    });
  }

  onEditLesson() {
    const dialogRef = this.dialog.open(AddEditLessonComponent, {
      panelClass: 'width-40rem',
      data: { lesson: this.lesson, newWords: this.newWords },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== DialogResult.Cancelled) {
        const message =
          result === DialogResult.Edited
            ? SnackbarMessage.Success
            : SnackbarMessage.Error;
        this.snackBarService.openSnackBar(
          message,
          undefined,
          this.snackbarClasses,
          3000
        );

        if (result === DialogResult.Edited) {
          this.getLessonData(this.lesson.id);
          this.getNewWordsData(this.lesson.id);
        }
      }
    });
  }

  onEditWord(word: NewWord) {
    const dialogRef = this.dialog.open(EditNewWordComponent, {
      data: word,
      panelClass: 'width-30rem',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== DialogResult.Cancelled) {
        const message = result
          ? SnackbarMessage.Success
          : SnackbarMessage.Error;
        this.snackBarService.openSnackBar(
          message,
          undefined,
          this.snackbarClasses,
          3000
        );

        if (result) {
          this.getNewWordsData(this.lessonId);
        }
      }
    });
  }

  constructor(
    private newWordsService: NewWordsService,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private levelsService: LevelsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBarService: MatSnackbarService
  ) {}
}
