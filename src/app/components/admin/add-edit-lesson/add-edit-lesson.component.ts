import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { BulkAddNewWordsComponent } from '../bulk-add-new-words/bulk-add-new-words.component';
import { NewWord } from 'src/app/models/NewWord';
import { NewWordsService } from 'src/app/services/new-words.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-lesson',
  templateUrl: './add-edit-lesson.component.html',
  styleUrls: ['./add-edit-lesson.component.scss'],
})
export class AddEditLessonComponent implements OnInit {
  @ViewChild('newWordComponent') newWordComponent: BulkAddNewWordsComponent;
  newLesson: Lesson = new Lesson();
  currentLevel: Level; // if editing a lesson
  edit: boolean = false;
  addEditForm: FormGroup;

  ngOnInit(): void {
    this.addEditForm = this.formBuilder.group({
      level: [null],
      id: [null],
      levelId: [null],
      name: ['', Validators.required],
      lessonOrderInLevel: [null, Validators.required],
      description: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData['id']) {
        this.edit = true;
        this.getEditLessonData(paramsData['id']);
      } else {
        const state = this.activatedRoute.snapshot.queryParams;
        if (state && state['levelId']) {
          this.addEditForm.controls['levelId'].setValue(state['levelId']);
          this.getLevelData(this.newLesson.levelId);
        }
      }
    });
  }

  getEditLessonData(lessonId: number) {
    this.lessonsService.getLessonById(lessonId).subscribe((data) => {
      this.newLesson = data;
      this.setFormData(this.newLesson);
    });
  }

  setFormData(formData: any) {
    this.addEditForm.setValue({
      id: formData.id,
      level: formData.level,
      levelId: formData.levelId,
      name: formData.name,
      lessonOrderInLevel: formData.lessonOrderInLevel,
      description: formData.description,
    });
  }

  getLevelData(levelId: number) {
    this.levelsService.getLevelById(levelId).subscribe((data) => {
      this.currentLevel = data;
      this.newLesson.levelId = this.currentLevel.id;
    });
  }

  onSubmit() {
    if (this.addEditForm.valid) {
      console.log(this.newLesson);
      this.saveLesson();
      this.router.navigateByUrl(`/level/${this.newLesson.levelId}`);
    }
  }

  saveLesson() {
    this.newLesson = this.addEditForm.value;

    if (this.edit) {
      this.lessonsService.updateLesson(this.newLesson).subscribe((data) => {
        this.newWordComponent.saveNewWords();
        this.router.navigateByUrl(`/lesson/${this.newLesson.id}`);
      });
    } else {
      this.lessonsService.insertLesson(this.newLesson).subscribe((data) => {
        this.newWordComponent.saveNewWords();
        this.router.navigateByUrl(`/level/${this.newLesson.levelId}`);
      });
    }
  }

  saveNewWords(newWords: NewWord[]) {
    this.newWordsService.insertNewWords(newWords).subscribe((data) => {});
  }

  constructor(
    private lessonsService: LessonsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private levelsService: LevelsService,
    private newWordsService: NewWordsService,
    private formBuilder: FormBuilder
  ) {}
}
