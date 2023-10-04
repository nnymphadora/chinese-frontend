import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewWord } from '../../../models/NewWord';
import { PronunciationService } from 'src/app/services/pronunciation.service';
import {
  faVolumeHigh,
  faTrashCan,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-word-card',
  templateUrl: './new-word-card.component.html',
  styleUrls: ['./new-word-card.component.scss'],
})
export class NewWordCardComponent implements OnInit {
  tokenData: any = this.authService.getTokenData();
  isAdmin: boolean = this.tokenData.isAdmin;

  fontSizeCn: number;
  fontSizeMn: number;

  @Input() newWordData: NewWord;
  @Input() editLink: string;

  @Output() cardDeleted = new EventEmitter<void>();
  @Output() editWord = new EventEmitter<void>();
  @Output() deleteWord = new EventEmitter<void>();

  flipped: boolean = false;
  soundIcon = faVolumeHigh;
  deleteBtn = faTrashCan;
  editBtn = faPenToSquare;

  ngOnInit(): void {
    this.adjustFontSizes();
  }

  toggle() {
    this.flipped = !this.flipped;
  }

  playPronunciation() {
    this.pronunciationService
      .getPronunciation(this.newWordData.content)
      .subscribe((data) => {
        const audioUrl = data.items[0].pathmp3;
        const audio = new Audio(audioUrl);
        audio.play();
      });
  }

  editClick(): void {
    this.editWord.emit();
  }

  deleteClick(): void {
    this.deleteWord.emit();
  }

  adjustFontSizes() {
    if (this.newWordData.content.length <= 2) {
      this.fontSizeCn = 5;
      this.fontSizeMn = 1.5;
    } else if (this.newWordData.content.length > 2) {
      this.fontSizeCn = 3.5;
      this.fontSizeMn = 1.2;
    }
  }

  constructor(
    private pronunciationService: PronunciationService,
    private authService: AuthService
  ) {}
}
