import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Lesson } from 'src/app/models/Lesson';

import { faTrashCan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NewWord } from 'src/app/models/NewWord';

@Component({
  selector: 'app-bulk-add-new-words',
  templateUrl: './bulk-add-new-words.component.html',
  styleUrls: ['./bulk-add-new-words.component.scss'],
})
export class BulkAddNewWordsComponent implements OnInit {
  private activeGroupIndex: number = 0;

  newWordsForm: FormGroup;

  addBtn = faPlusCircle;
  deleteBtn = faTrashCan;

  @Input() lesson: Lesson;
  @Input() onSave: (newWords: NewWord[]) => void;

  ngOnInit(): void {
    this.newWordsForm = this.formBuilder.group({
      newWords: this.formBuilder.array([]),
    });
  }

  get newWordForms() {
    return this.newWordsForm.get('newWords') as FormArray;
  }

  addWordGroup(): void {
    const newWordGroup = this.formBuilder.group({
      content: ['', Validators.required],
      meaning: ['', Validators.required],
      pinyin: ['', Validators.required],
      relatedLessonId: [this.lesson.id],
      exSent1: [''],
      exSent1Mne: [''],
      exSent2: [''],
      exSent2Mne: [''],
    });
    this.newWordForms.push(newWordGroup);
    this.activeGroupIndex = this.newWordForms.length - 1;
  }

  deleteWordGroup(i: number): void {
    this.newWordForms.removeAt(i);
  }

  saveNewWords() {
    const newWords = this.newWordForms.value;
    this.onSave(newWords);
  }

  onGroupClick(index: number) {
    this.activeGroupIndex = index;
  }

  isGroupActive(index: number): boolean {
    return this.activeGroupIndex === index;
  }

  constructor(private formBuilder: FormBuilder) {}
}
