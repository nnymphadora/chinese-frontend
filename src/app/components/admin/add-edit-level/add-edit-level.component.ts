import { Component, OnInit } from '@angular/core';
import { LevelCefrEquiv } from 'src/app/models/LevelCefrEquiv';
import { LevelDifficulty } from 'src/app/models/LevelDifficulty';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-add-edit-level',
  templateUrl: './add-edit-level.component.html',
  styleUrls: ['./add-edit-level.component.scss'],
})
export class AddEditLevelComponent implements OnInit {
  difficulties: LevelDifficulty[];
  cefrEquivs: LevelCefrEquiv[];

  ngOnInit(): void {
    this.levelDifficultyService
      .getAllLevelDifficulty()
      .subscribe((data) => (this.difficulties = data));

    this.levelCefrEquivService
      .getAllLevelCefrEquiv()
      .subscribe((data) => (this.cefrEquivs = data));
  }

  constructor(
    private levelDifficultyService: LevelDifficultyService,
    private levelCefrEquivService: LevelCefrEquivService,
    private levelsService: LevelsService
  ) {}
}
