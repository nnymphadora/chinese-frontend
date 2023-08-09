import { Component, OnInit } from '@angular/core';
import { NewWordsService } from 'src/app/services/new-words.service';
import { NewWord } from '../../../models/NewWord';
import { Level } from 'src/app/models/Level';
import { Lesson } from 'src/app/models/Lesson';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-new-word-card',
  templateUrl: './new-word-card.component.html',
  styleUrls: ['./new-word-card.component.scss'],
})
export class NewWordCardComponent implements OnInit {
  newWord: NewWord;
  flipped: boolean = false;

  ngOnInit(): void {}

  toggle() {
    this.flipped = !this.flipped;
  }
  constructor(
    private newWordsService: NewWordsService,
    private lessonsService: LessonsService,
    private levelsService: LevelsService
  ) {}
}
