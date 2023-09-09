import { Component, Inject, OnInit } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelCefrEquiv } from 'src/app/models/LevelCefrEquiv';
import { LevelDifficulty } from 'src/app/models/LevelDifficulty';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { LevelsService } from 'src/app/services/levels.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../../../enums/dialog-result';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-level',
  templateUrl: './add-edit-level.component.html',
  styleUrls: ['./add-edit-level.component.scss'],
})
export class AddEditLevelComponent implements OnInit {
  closeIcon = faXmark;

  addEditLevelForm: FormGroup;

  difficulties: LevelDifficulty[] = [];
  cefrEquivs: LevelCefrEquiv[] = [];
  edit: boolean = false;

  ngOnInit(): void {
    this.addEditLevelForm = this.formBuilder.group({
      id: null,
      name: [null, Validators.required],
      difficulty: [null, Validators.required],
      description: [null, Validators.required],
      cefrEquiv: [null, Validators.required],
      isActive: [],
      isRemoved: [],
    });

    this.getLevelDifficulutiesData();
    this.getLevelCefrEquivsData();

    if (this.data) {
      this.edit = true;
      this.addEditLevelForm.setValue(this.data);
    }
  }

  getLevelData(levelId: number) {
    this.levelsService.getLevelById(levelId).subscribe((data) => {});
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
      const level = this.addEditLevelForm.value;
      if (!this.edit) {
        this.levelsService.insertLevel(level).subscribe((data) => {
          this.dialogRef.close(DialogResult.Added);
        });
      } else {
        this.levelsService
          .updateLevel(level)
          .subscribe((data) => this.dialogRef.close(DialogResult.Edited));
      }
    }
  }

  closeDialog() {
    this.dialogRef.close(DialogResult.Cancelled);
  }

  constructor(
    private levelDifficultyService: LevelDifficultyService,
    private levelCefrEquivService: LevelCefrEquivService,
    private levelsService: LevelsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Level
  ) {}
}
