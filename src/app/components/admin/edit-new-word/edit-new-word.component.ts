import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewWord } from 'src/app/models/NewWord';
import { NewWordsService } from 'src/app/services/new-words.service';

@Component({
  selector: 'app-edit-new-word',
  templateUrl: './edit-new-word.component.html',
  styleUrls: ['./edit-new-word.component.scss'],
})
export class EditNewWordComponent implements OnInit {
  newWord: NewWord;
  editNewWordForm: FormGroup;

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

    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData && paramsData['id']) {
        this.newwordsService
          .getNewWordById(paramsData['id'])
          .subscribe((data) => {
            this.newWord = data;
            this.editNewWordForm.setValue(this.newWord);
          });
      }
    });
  }

  saveNewWord() {
    if (this.editNewWordForm.valid) {
      this.newWord = this.editNewWordForm.value;
      this.newwordsService.updateNewWord(this.newWord).subscribe((data) => {
        this.router.navigateByUrl(`/lesson/${this.newWord.relatedLessonId}`);
      });
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newwordsService: NewWordsService,
    private formBuilder: FormBuilder
  ) {}
}
