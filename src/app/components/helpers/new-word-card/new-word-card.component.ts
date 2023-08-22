import {
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NewWordsService } from 'src/app/services/new-words.service';
import { NewWord } from '../../../models/NewWord';
import { PronunciationService } from 'src/app/services/pronunciation.service';
import {
  faVolumeHigh,
  faTrashCan,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ViewLessonComponent } from '../../pages/view-lesson/view-lesson.component';

@Component({
  selector: 'app-new-word-card',
  templateUrl: './new-word-card.component.html',
  styleUrls: ['./new-word-card.component.scss'],
})
export class NewWordCardComponent implements OnInit {
  @Input() newWordData: NewWord;
  @Input() editLink: string;

  @Output() cardDeleted = new EventEmitter<void>();

  flipped: boolean = false;
  soundIcon = faVolumeHigh;
  deleteBtn = faTrashCan;
  editBtn = faPenToSquare;

  ngOnInit(): void {}

  toggle() {
    this.flipped = !this.flipped;
  }
  constructor(
    private newWordsService: NewWordsService,
    private pronunciationService: PronunciationService,
    private router: Router
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

  deleteNewWord(id: number) {
    if (confirm('Obriši riječ?')) {
      this.newWordsService.deleteNewWord(id).subscribe((data) => {
        this.cardDeleted.emit();
      });
    }
  }
}
