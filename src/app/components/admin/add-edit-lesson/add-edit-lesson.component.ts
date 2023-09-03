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
        const editLessonId = paramsData['id'];
        this.lessonsService.getLessonById(editLessonId).subscribe((data) => {
          this.newLesson = data;
          this.addEditForm.setValue({
            id: this.newLesson.id,
            level: this.newLesson.level,
            levelId: this.newLesson.levelId,
            name: this.newLesson.name,
            lessonOrderInLevel: this.newLesson.lessonOrderInLevel,
            description: this.newLesson.description,
          });
        });
      } else {
        const state = this.activatedRoute.snapshot.queryParams;

        if (state && state['levelId']) {
          this.addEditForm.controls['levelId'].setValue(state['levelId']);
          this.levelsService
            .getLevelById(this.newLesson.levelId)
            .subscribe((data) => {
              this.currentLevel = data;
              this.newLesson.levelId = this.currentLevel.id;
            });
        }
      }
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

  // saveLesson() {
  //   if (!this.edit) {
  //     if(this.addEditForm.valid) {

  //     }
  //     let levelId = this.lessonsService
  //       .insertLesson(this.newLesson)
  //       .subscribe((data) => {
  //         this.newWordComponent.saveNewWords();
  //         this.router.navigateByUrl(`/level/${this.newLesson.levelId}`);
  //       });
  //   } else {
  //     this.lessonsService.updateLesson(this.newLesson).subscribe((data) => {
  //       this.newWordComponent.saveNewWords();
  //       this.router.navigateByUrl(`/lesson/${this.newLesson.id}`);
  //     });
  //   }
  // }

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
