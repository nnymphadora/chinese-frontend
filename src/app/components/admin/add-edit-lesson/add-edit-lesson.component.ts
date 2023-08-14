import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-add-edit-lesson',
  templateUrl: './add-edit-lesson.component.html',
  styleUrls: ['./add-edit-lesson.component.scss'],
})
export class AddEditLessonComponent implements OnInit {
  newLesson: Lesson = new Lesson();
  currentLevel: Level; // if editing a lesson
  currentLevelId: number; //if adding new lesson
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
          this.currentLevelId = state['levelId'];
          this.levelsService
            .getLevelById(this.currentLevelId)
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
          this.router.navigateByUrl(`/level/${this.newLesson.levelId}`);
        });
    } else {
      console.log(this.newLesson);
      this.lessonsService
        .updateLesson(this.newLesson)
        .subscribe((data) =>
          this.router.navigateByUrl(`/lesson/${this.newLesson.id}`)
        );
    }
    console.log(this.newLesson);
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
    private levelsService: LevelsService
  ) {}
}
