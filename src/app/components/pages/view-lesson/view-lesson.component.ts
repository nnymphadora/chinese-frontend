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

import { QuickEditInfoMenuComponent } from '../../helpers/quick-edit-info-menu/quick-edit-info-menu.component';

@Component({
  selector: 'app-view-words-for-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.scss'],
})
export class ViewLessonComponent implements OnInit {
  newWords: NewWord[];
  lesson: Lesson;
  level: Level;

  isActiveLesson: boolean;

  rightArrow = faArrowAltCircleRight;
  editIcon: IconDefinition = faPenToSquare;
  deleteIcon: IconDefinition = faTrashCan;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      let lessonId = paramsData['id'];
      this.newWordsService
        .getNewWordsByLesson(lessonId)
        .subscribe((data) => (this.newWords = data));

      this.lessonsService.getLessonById(lessonId).subscribe((data) => {
        this.lesson = data;
        this.isActiveLesson = !!this.lesson.isActive;
        let levelId = this.lesson.levelId;

        this.levelsService
          .getLevelByID(levelId)
          .subscribe((data) => (this.level = data));
      });
    });
  }

  softDeleteLesson() {
    if (confirm('Obriši lekciju?')) {
      this.lessonsService.softDeleteLesson(this.level).subscribe((data) => {});
      this.router.navigateByUrl('/lessons');
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
    const val = value ? 0 : 0;

    this.toggleActiveLesson(val);
  }

  constructor(
    private newWordsService: NewWordsService,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private levelsService: LevelsService,
    private router: Router
  ) {}
}