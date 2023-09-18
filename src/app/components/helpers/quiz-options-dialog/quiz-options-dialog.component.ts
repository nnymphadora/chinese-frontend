import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-options-dialog',
  templateUrl: './quiz-options-dialog.component.html',
  styleUrls: ['./quiz-options-dialog.component.scss'],
})
export class QuizOptionsDialogComponent implements OnInit {
  allLevels: Level[];
  allLessonsForLevel: Lesson[];
  levelLessonForm: FormGroup;
  lessonsAvailable: boolean = false;

  ngOnInit(): void {
    this.getAllLevels();

    this.levelLessonForm = this.formBuilder.group({
      level: ['', Validators.required],
      lesson: ['', Validators.required],
    });
  }

  onLevelChange() {
    const selectedLevelId = this.levelLessonForm.get('level').value;
    this.getAllLessonsForLevel(selectedLevelId);
  }

  onSubmit() {
    if (this.levelLessonForm.valid) {
      const selectedLessonId = this.levelLessonForm.get('lesson').value;
      this.dialogRef.close(selectedLessonId);
    } else {
      //handle error
    }
  }

  getAllLevels() {
    this.levelsService.getAllLevels().subscribe((data) => {
      this.allLevels = data;
    });
  }

  getAllLessonsForLevel(levelId: number) {
    this.lessonsService.getAllLessonsByLevelId(levelId).subscribe((data) => {
      this.allLessonsForLevel = data;
      this.lessonsAvailable = true;
    });
  }

  constructor(
    private levelsService: LevelsService,
    private lessonsService: LessonsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QuizOptionsDialogComponent>
  ) {}
}
