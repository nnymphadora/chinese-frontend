import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import {
  IconDefinition,
  faArrowAltCircleRight,
  faPenToSquare,
  faPlusCircle,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router } from '@angular/router';
import { LevelDifficulty } from 'src/app/models/LevelDifficulty';
import { LevelCefrEquiv } from 'src/app/models/LevelCefrEquiv';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLevelComponent } from '../../admin/add-edit-level/add-edit-level.component';

import { DialogResult } from 'src/app/enums/dialog-result';
import { SnackbarMessage } from 'src/app/enums/snackbar-message';
import { AddEditLessonComponent } from '../../admin/add-edit-lesson/add-edit-lesson.component';
import { ConfirmDialogComponent } from '../../helpers/confirm-dialog/confirm-dialog.component';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';

@Component({
  selector: 'app-view-level',
  templateUrl: './view-level.component.html',
  styleUrls: ['./view-level.component.scss'],
})
export class ViewLevelComponent implements OnInit {
  tokenData: any = this.authService.getTokenData();
  isAdmin: boolean = this.tokenData.isAdmin;

  rightArrow = faArrowAltCircleRight;
  editIcon: IconDefinition = faPenToSquare;
  deleteIcon: IconDefinition = faTrashCan;
  roundPlus = faPlusCircle;
  snackbarClasses: string[] = ['snackbar', 'snackbar-blue', 'no-action'];

  isActiveLevel: boolean;

  level: Level;
  lessons: Lesson[];
  difficulties: LevelDifficulty[];
  cefrEquivs: LevelCefrEquiv[];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.activatedRoute.params.subscribe((paramsData) => {
      const levelId: number = paramsData['id'];
      this.getLevelData(levelId);
      this.getLessonsData(levelId);
    });

    this.getLevelDifficultiesData();
    this.getLevelCefrEquivsData();
  }

  getLevelData(levelId: number) {
    this.levelsService.getLevelById(levelId).subscribe((data) => {
      this.level = data;
      this.isActiveLevel = !!data.isActive;
    });
  }

  getLessonsData(levelId: number) {
    this.lessonsService.getAllLessonsByLevelId(levelId).subscribe((data) => {
      this.lessons = data.sort(
        (a, b) => a.lessonOrderInLevel - b.lessonOrderInLevel
      );
    });
  }
  getLevelCefrEquivsData() {
    this.levelCefrEquivService
      .getAllLevelCefrEquiv()
      .subscribe((data) => (this.cefrEquivs = data));
  }

  getLevelDifficultiesData() {
    this.levelDifficultyService
      .getAllLevelDifficulty()
      .subscribe((data) => (this.difficulties = data));
  }

  onSoftDeleteLevel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Obriši modul?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.levelsService
          .softDeleteLevel(this.level)
          .subscribe((data: any) => {
            const message = data.success
              ? SnackbarMessage.Success
              : SnackbarMessage.Error;

            this.snackBarService.openSnackBar(
              message,
              undefined,
              this.snackbarClasses,
              3000
            );
            if (data.success) {
              this.router.navigateByUrl(`/levels`);
            }
          });
      }
    });
  }

  toggleActiveLevel(toggleActive: number) {
    this.levelsService
      .toggleActiveLevel(this.level.id, toggleActive)
      .subscribe(() => {
        this.getLevelData(this.level.id);
      });
  }

  handleToggle(value: boolean) {
    const val = value ? 1 : 0;

    this.toggleActiveLevel(val);
  }

  onEditLevel() {
    const dialogRef = this.dialog.open(AddEditLevelComponent, {
      data: this.level,
      panelClass: 'width-35rem',
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
          this.getLevelData(this.level.id);
        }
      }
    });
  }

  onAddLesson() {
    const lesson = new Lesson();
    lesson.levelId = this.level.id;
    const dialogRef = this.dialog.open(AddEditLessonComponent, {
      panelClass: 'width-40rem',
      data: this.level.id,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== DialogResult.Cancelled) {
        const message: string =
          result === DialogResult.Added
            ? SnackbarMessage.Success
            : SnackbarMessage.Error;
        this.snackBarService.openSnackBar(
          message,
          undefined,
          this.snackbarClasses,
          3000
        );
        if (result === DialogResult.Added) {
          this.getLessonsData(this.level.id);
        }
      }
    });
  }

  showElToUser(el: Lesson): boolean {
    return el.isActive === 1 || this.isAdmin;
  }

  constructor(
    private levelsService: LevelsService,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private levelDifficultyService: LevelDifficultyService,
    private levelCefrEquivService: LevelCefrEquivService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBarService: MatSnackbarService
  ) {}
}
