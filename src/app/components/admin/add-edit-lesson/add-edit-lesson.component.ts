import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { BulkAddNewWordsComponent } from '../bulk-add-new-words/bulk-add-new-words.component';
import { NewWord } from 'src/app/models/NewWord';
import { NewWordsService } from 'src/app/services/new-words.service';

@Component({
  selector: 'app-add-edit-lesson',
  templateUrl: './add-edit-lesson.component.html',
  styleUrls: ['./add-edit-lesson.component.scss'],
})
export class AddEditLessonComponent implements OnInit {
  @ViewChild('newWordComponent') newWordComponent: BulkAddNewWordsComponent;
  newLesson: Lesson = new Lesson();
  currentLevel: Level; // if editing a lesson
  allLevels: Level[];
  edit: boolean = false;

  ngOnInit(): void {
    this.levelsService.getAllLevels().subscribe((data) => {
      this.allLevels = data;
    });

    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData['id']) {
        this.edit = true;
        const editLessonId = paramsData['id'];
        this.lessonsService.getLessonById(editLessonId).subscribe((data) => {
          this.newLesson = data;
          this.levelsService
            .getLevelById(this.newLesson.levelId)
            .subscribe((data) => {
              this.currentLevel = data;
            });
        });
      } else {
        const state = this.activatedRoute.snapshot.queryParams;

        if (state && state['levelId']) {
          this.newLesson.levelId = state['levelId'];
          this.levelsService
            .getLevelById(this.newLesson.levelId)
            .subscribe((data) => {
              this.currentLevel = data;
            });
        }
      }
    });
  }

  saveLesson() {
    if (!this.edit) {
      let levelId = this.lessonsService
        .insertLesson(this.newLesson)
        .subscribe((data) => {
          this.newWordComponent.saveNewWords();
          this.router.navigateByUrl(`/level/${this.newLesson.levelId}`);
        });
    } else {
      console.log(this.newLesson);
      this.lessonsService.updateLesson(this.newLesson).subscribe((data) => {
        this.newWordComponent.saveNewWords();
        this.router.navigateByUrl(`/lesson/${this.newLesson.id}`);
      });
    }
  }

  saveNewWords(newWords: NewWord[]) {
    this.newWordsService.insertNewWords(newWords).subscribe((data) => {});
  }

  checkForm(): boolean {
    return !!(
      this.newLesson.name &&
      this.newLesson.levelId &&
      this.newLesson.lessonOrderInLevel
    );
  }

  constructor(
    private lessonsService: LessonsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private levelsService: LevelsService,
    private newWordsService: NewWordsService
  ) {}
}
