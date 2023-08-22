import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData && paramsData['id']) {
        this.newwordsService
          .getNewWordById(paramsData['id'])
          .subscribe((data) => {
            this.newWord = data;
          });
      }
    });
  }

  saveNewWord() {
    this.newwordsService.insertNewWords([this.newWord]).subscribe((data) => {
      console.log(data);
    });
  }

  checkForm(): boolean {
    return !!(
      this.newWord.content &&
      this.newWord.meaning &&
      this.newWord.pinyin
    );
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newwordsService: NewWordsService
  ) {}
}
