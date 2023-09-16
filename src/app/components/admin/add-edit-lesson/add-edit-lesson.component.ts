import { Component, Inject, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/Lesson';
import { Level } from 'src/app/models/Level';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { NewWord } from 'src/app/models/NewWord';
import { NewWordsService } from 'src/app/services/new-words.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from 'src/app/enums/dialog-result';
import { faPlusCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-lesson',
  templateUrl: './add-edit-lesson.component.html',
  styleUrls: ['./add-edit-lesson.component.scss'],
})
export class AddEditLessonComponent implements OnInit {
  addBtn = faPlusCircle;
  closeBtn = faXmark;

  currentLevel: Level;
  currentLesson: Lesson;
  newWords: NewWord[];
  addEditForm: FormGroup;
  newWordsForm: FormGroup;

  edit: boolean = false;
  activeGroupIndex: number = 0;

  ngOnInit(): void {
    //the lesson form
    this.addEditForm = this.formBuilder.group({
      id: [null],
      levelId: [null],
      name: ['', Validators.required],
      level: [null],
      lessonOrderInLevel: [null, Validators.required],
      description: ['', Validators.required],
      isActive: [null],
      isRemoved: [null],
    });

    //the new words form array
    this.newWordsForm = this.formBuilder.group({
      allNewWordForms: this.formBuilder.array([]),
    });

    this.checkIfEdit(this.dialogData);
  }

  get allNewWordFormsArray() {
    return this.newWordsForm.get('allNewWordForms') as FormArray;
  }

  checkIfEdit(dialogData: any) {
    if (dialogData.lesson) {
      this.edit = true;
      this.handleEdit(dialogData);
      this.getLevelData(dialogData.lesson.levelId);
    } else {
      this.getLevelData(dialogData);
    }
  }

  handleEdit(editData: any) {
    this.currentLesson = editData.lesson;
    this.newWords = editData.newWords;
    this.addEditForm.setValue(this.currentLesson);
    this.newWords.forEach((newWord) => {
      const existingNewWordGroup = this.formBuilder.group({
        id: newWord.id,
        content: [newWord.content, Validators.required],
        meaning: [newWord.meaning, Validators.required],
        pinyin: [newWord.pinyin, Validators.required],
        relatedLessonId: [this.currentLesson.id],
        exSent1: [newWord.exSent1],
        exSent1Mne: [newWord.exSent1Mne],
        exSent2: [newWord.exSent2],
        exSent2Mne: [newWord.exSent2Mne],
      });
      this.allNewWordFormsArray.push(existingNewWordGroup);
    });
  }

  getLevelData(levelId: number) {
    this.levelsService.getLevelById(levelId).subscribe((data) => {
      this.currentLevel = data;
    });
  }

  saveLesson() {
    if (this.addEditForm.valid) {
      this.currentLesson = this.addEditForm.value;
      if (this.edit) {
        this.lessonsService
          .updateLesson(this.currentLesson)
          .subscribe((data) => {
            this.saveNewWords(
              this.allNewWordFormsArray.getRawValue(),
              this.edit
            );
            this.dialogRef.close(DialogResult.Edited);
          });
      } else {
        this.currentLesson.levelId = this.currentLevel.id;
        this.lessonsService
          .insertLesson(this.currentLesson)
          .subscribe((data: any) => {
            this.currentLesson.id = data.result.insertId;
            this.allNewWordFormsArray.controls.forEach((word: any) => {
              word.controls.relatedLessonId.setValue(this.currentLesson.id);
            });

            this.saveNewWords(
              this.allNewWordFormsArray.getRawValue(),
              this.edit
            );
            this.dialogRef.close(DialogResult.Added);
          });
      }
    }
  }

  saveNewWords(newWords: NewWord[], isEdit: boolean) {
    if (isEdit) {
      return this.newWordsService
        .updateNewWordsForEditedLesson(newWords, this.currentLesson.id)
        .subscribe((data) => {});
    } else {
      return this.newWordsService
        .insertNewWords(newWords)
        .subscribe((data) => {});
    }
  }

  addNewWordGroup(): void {
    const newWordGroup = this.formBuilder.group({
      content: ['', Validators.required],
      meaning: ['', Validators.required],
      pinyin: ['', Validators.required],
      relatedLessonId: [this.currentLesson?.id ?? null],
      exSent1: [''],
      exSent1Mne: [''],
      exSent2: [''],
      exSent2Mne: [''],
    });
    this.allNewWordFormsArray.push(newWordGroup);
    this.activeGroupIndex = this.allNewWordFormsArray.length - 1;
  }

  onGroupClick(index: number) {
    this.activeGroupIndex = index;
  }

  isGroupActive(index: number): boolean {
    return this.activeGroupIndex === index;
  }

  onDelete(index: number) {
    this.allNewWordFormsArray.removeAt(index);
  }

  closeDialog() {
    this.dialogRef.close(DialogResult.Cancelled);
  }

  constructor(
    private lessonsService: LessonsService,
    private levelsService: LevelsService,
    private newWordsService: NewWordsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditLessonComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}
}
