import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-lessons-for-level',
  templateUrl: './view-lessons-for-level.component.html',
  styleUrls: ['./view-lessons-for-level.component.scss'],
})
export class ViewLessonsForLevelComponent implements OnInit {
  rightArrow = faArrowAltCircleRight;

  level: Level;
  lessons: Lesson[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      let levelId: number = paramsData['id'];
      this.levelsService
        .getLevelByID(levelId)
        .subscribe((data) => (this.level = data));
      this.lessonsService.getAllLessonsByLevelId(levelId).subscribe((data) => {
        this.lessons = data.sort(
          (a, b) => a.lessonOrderInLevel - b.lessonOrderInLevel
        );
      });
    });
  }

  constructor(
    private levelsService: LevelsService,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute
  ) {}
}
