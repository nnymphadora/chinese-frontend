import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { Lesson } from 'src/app/models/Lesson';
import { NewWordService } from 'src/app/services/new-word.service';
import { NewWord } from 'src/app/models/NewWord';
import { Level } from 'src/app/models/Level';
import { ActivatedRoute } from '@angular/router';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-view-words-for-lesson',
  templateUrl: './view-words-for-lesson.component.html',
  styleUrls: ['./view-words-for-lesson.component.scss'],
})
export class ViewWordsForLessonComponent implements OnInit {
  newWords: NewWord[];
  lesson: Lesson;
  level: Level;

  ngOnInit(): void {
    this.activateRoute.params.subscribe((paramsData) => {
      let lessonId = paramsData['id'];
      this.newWordService
        .getNewWordsByLesson(lessonId)
        .subscribe((data) => (this.newWords = data));

      this.lessonService.getLessonById(lessonId).subscribe((data) => {
        this.lesson = data;
        let levelId = this.lesson.levelId;

        this.levelService
          .getLevelByID(levelId)
          .subscribe((data) => (this.level = data));
      });
    });
  }

  constructor(
    private newWordService: NewWordService,
    private lessonService: LessonsService,
    private activateRoute: ActivatedRoute,
    private levelService: LevelsService
  ) {}
}
