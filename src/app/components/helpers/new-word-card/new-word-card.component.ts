import { Component, Input, OnInit } from '@angular/core';
import { NewWordsService } from 'src/app/services/new-words.service';
import { NewWord } from '../../../models/NewWord';
import { Level } from 'src/app/models/Level';
import { Lesson } from 'src/app/models/Lesson';
import { LessonsService } from 'src/app/services/lessons.service';
import { LevelsService } from 'src/app/services/levels.service';
import { PronunciationService } from 'src/app/services/pronunciation.service';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-word-card',
  templateUrl: './new-word-card.component.html',
  styleUrls: ['./new-word-card.component.scss'],
})
export class NewWordCardComponent implements OnInit {
  @Input() newWordData: NewWord;
  flipped: boolean = false;
  soundIcon = faVolumeHigh;

  ngOnInit(): void {}

  toggle() {
    this.flipped = !this.flipped;
  }
  constructor(
    private newWordsService: NewWordsService,
    private lessonsService: LessonsService,
    private levelsService: LevelsService,
    private pronunciationService: PronunciationService
  ) {}

  playPronunciation() {
    this.pronunciationService
      .getPronunciation(this.newWordData.content)
      .subscribe((data) => {
        const audioUrl = data.items[0].pathmp3; // Adjust the path to match Forvo's API response structure
        const audio = new Audio(audioUrl);
        audio.play();
      });
  }
}
