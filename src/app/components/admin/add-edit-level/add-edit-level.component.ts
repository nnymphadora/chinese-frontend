import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelCefrEquiv } from 'src/app/models/LevelCefrEquiv';
import { LevelDifficulty } from 'src/app/models/LevelDifficulty';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { LevelsService } from 'src/app/services/levels.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-level',
  templateUrl: './add-edit-level.component.html',
  styleUrls: ['./add-edit-level.component.scss'],
})
export class AddEditLevelComponent implements OnInit {
  difficulties: LevelDifficulty[];
  cefrEquivs: LevelCefrEquiv[];
  newLevel: Level = new Level();
  edit: boolean = false;

  ngOnInit(): void {
    this.levelDifficultyService.getAllLevelDifficulty().subscribe((data) => {
      this.difficulties = data;
    });

    this.levelCefrEquivService
      .getAllLevelCefrEquiv()
      .subscribe((data) => (this.cefrEquivs = data));

    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData['id']) {
        this.edit = true;
        const editLevelId = paramsData['id'];
        this.levelsService.getLevelById(editLevelId).subscribe((data) => {
          this.newLevel = data;
        });
      }
    });
  }

  saveLevel() {
    if (!this.edit) {
      this.levelsService.insertLevel(this.newLevel).subscribe((data) => {
        this.router.navigateByUrl('/levels');
      });
    } else {
      this.levelsService
        .updateLevel(this.newLevel)
        .subscribe((data) => this.router.navigateByUrl('/levels'));
    }
  }
  checkForm(): boolean {
    return !!(
      this.newLevel.name &&
      this.newLevel.difficulty &&
      this.newLevel.cefrEquiv &&
      this.newLevel.description
    );
  }
  constructor(
    private levelDifficultyService: LevelDifficultyService,
    private levelCefrEquivService: LevelCefrEquivService,
    private levelsService: LevelsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
