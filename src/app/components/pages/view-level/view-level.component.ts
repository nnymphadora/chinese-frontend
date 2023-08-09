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

@Component({
  selector: 'app-view-level',
  templateUrl: './view-level.component.html',
  styleUrls: ['./view-level.component.scss'],
})
export class ViewLevelComponent implements OnInit {
  rightArrow = faArrowAltCircleRight;
  editIcon: IconDefinition = faPenToSquare;
  deleteIcon: IconDefinition = faTrashCan;
  roundPlus = faPlusCircle;

  isActiveLevel: boolean;

  level: Level;
  lessons: Lesson[];
  difficulties: LevelDifficulty[];
  cefrEquivs: LevelCefrEquiv[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      let levelId: number = paramsData['id'];
      this.levelsService.getLevelByID(levelId).subscribe((data) => {
        this.level = data;
        this.isActiveLevel = !!data.isActive;
        console.log('inicijalizacija kompo', this.isActiveLevel);
        console.log(this.isActiveLevel);
      });
      this.lessonsService.getAllLessonsByLevelId(levelId).subscribe((data) => {
        this.lessons = data.sort(
          (a, b) => a.lessonOrderInLevel - b.lessonOrderInLevel
        );
      });
    });
    this.levelDifficultyService
      .getAllLevelDifficulty()
      .subscribe((data) => (this.difficulties = data));

    this.levelCefrEquivService
      .getAllLevelCefrEquiv()
      .subscribe((data) => (this.cefrEquivs = data));
  }

  softDeleteLevel() {
    if (confirm('Obriši modul?')) {
      this.levelsService.softDeleteLevel(this.level).subscribe((data) => {});
      this.router.navigateByUrl('/levels');
    }
  }

  toggleActiveLevel(toggleActive: number) {
    this.levelsService
      .toggleActiveLevel(this.level.id, toggleActive)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  handleToggle(value: boolean) {
    const val = value ? 1 : 0;
    console.log('handle fired ', value);
    this.toggleActiveLevel(val);
  }

  constructor(
    private levelsService: LevelsService,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private levelDifficultyService: LevelDifficultyService,
    private levelCefrEquivService: LevelCefrEquivService,
    private router: Router
  ) {}
}