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
      let levelId = this.lesson.levelId;
      this.getLevelData(levelId);
    });
  }

  getLevelData(levelId: number) {
    this.levelsService
      .getLevelById(levelId)
      .subscribe((data) => (this.level = data));
  }

  softDeleteLesson() {
    if (confirm('Obriši lekciju?')) {
      this.lessonsService.softDeleteLesson(this.lesson).subscribe((data) => {
        this.router.navigateByUrl(`/level/${this.lesson.levelId}`);
      });
    }
  }

  toggleActiveLesson(toggleActive: number) {
    this.lessonsService
      .toggleActiveLesson(this.lesson.id, toggleActive)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  handleToggle(value: boolean) {
    const val = value ? 1 : 0;

    this.toggleActiveLesson(val);
  }
  onDeleteWord(id: number) {
    this.newWordsService.deleteNewWord(id).subscribe((data) => {
      this.ngOnInit();
    });
  }

  onEditWord(word: NewWord) {
    const dialogRef = this.dialog.open(EditNewWordComponent, {
      width: '40%',
      data: word,
    });
    dialogRef.afterClosed().subscribe((result: NewWord) => {
      if (result) {
        this.getNewWordsData(this.lessonId);
      }
    });
  }

  constructor(
    private newWordsService: NewWordsService,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private levelsService: LevelsService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
