import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelCefrEquiv } from 'src/app/models/LevelCefrEquiv';
import { LevelDifficulty } from 'src/app/models/LevelDifficulty';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { LevelsService } from 'src/app/services/levels.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-level',
  templateUrl: './add-edit-level.component.html',
  styleUrls: ['./add-edit-level.component.scss'],
})
export class AddEditLevelComponent implements OnInit {
  difficulties: LevelDifficulty[] = [];
  cefrEquivs: LevelCefrEquiv[] = [];
  newLevel: Level = new Level();
  edit: boolean = false;
  addEditLevelForm: FormGroup;

  ngOnInit(): void {
    this.addEditLevelForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      difficulty: [null, Validators.required],
      description: [null, Validators.required],
      cefrEquiv: [null, Validators.required],
      isActive: [],
      isRemoved: [],
    });

    this.getLevelDifficulutiesData();
    this.getLevelCefrEquivsData;

    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData['id']) {
        this.edit = true;
        const editLevelId = paramsData['id'];
        this.getLevelData(editLevelId);
      }
    });
  }

  getLevelData(levelId: number) {
    this.levelsService.getLevelById(levelId).subscribe((data) => {
      this.addEditLevelForm.setValue(data);
    });
  }

  getLevelDifficulutiesData() {
    this.levelDifficultyService.getAllLevelDifficulty().subscribe((data) => {
      this.difficulties = data;
    });
  }

  getLevelCefrEquivsData() {
    this.levelCefrEquivService
      .getAllLevelCefrEquiv()
      .subscribe((data) => (this.cefrEquivs = data));
  }

  saveLevel() {
    if (this.addEditLevelForm.valid) {
      this.newLevel = this.addEditLevelForm.value;
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
  }

  constructor(
    private levelDifficultyService: LevelDifficultyService,
    private levelCefrEquivService: LevelCefrEquivService,
    private levelsService: LevelsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
}
