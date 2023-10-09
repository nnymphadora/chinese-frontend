import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewWord } from 'src/app/models/NewWord';
import { NewWordsService } from 'src/app/services/new-words.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogResult } from 'src/app/enums/dialog-result';

@Component({
  selector: 'app-edit-new-word',
  templateUrl: './edit-new-word.component.html',
  styleUrls: ['./edit-new-word.component.scss'],
})
export class EditNewWordComponent implements OnInit {
  editNewWordForm: FormGroup;
  closeIcon = faXmark;

  ngOnInit(): void {
    this.editNewWordForm = this.formBuilder.group({
      id: [null],
      relatedLessonId: [null],
      content: ['', Validators.required],
      meaning: ['', Validators.required],
      pinyin: ['', Validators.required],
      exSent1: [null],
      exSent1Mne: [null],
      exSent2: [null],
      exSent2Mne: [null],
    });

    this.editNewWordForm.setValue(this.data);
  }

  saveNewWord() {
    if (this.editNewWordForm.valid) {
      const newWord = this.editNewWordForm.value;
      this.newwordsService.updateNewWord(newWord).subscribe((data: any) => {
        console.log('pozvali serviss');

        if (data && data.result.affectedRows > 0) this.dialogRef.close(true);
        else this.dialogRef.close(false);
      });
    }
  }

  closeDialog() {
    this.dialogRef.close(DialogResult.Cancelled);
  }

  constructor(
    private newwordsService: NewWordsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditNewWordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewWord
  ) {}
}
