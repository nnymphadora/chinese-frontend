import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewWord } from 'src/app/models/NewWord';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import HanziWriter from 'hanzi-writer';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-character-strokes-preview-dialog',
  templateUrl: './character-strokes-preview-dialog.component.html',
  styleUrls: ['./character-strokes-preview-dialog.component.scss'],
})
export class CharacterStrokesPreviewComponent implements OnInit {
  newWord: NewWord;
  cancelIcon = faXmark;
  noOfChars: number;
  charsArray: Character[];

  ngOnInit(): void {
    this.newWord = this.dialogData;
    this.noOfChars = this.newWord.content.length;
    for (let i = 0; i < this.noOfChars; i++) {
      setTimeout(() => {
        const writer = HanziWriter.create(
          `character-target-div-${i}`,
          this.newWord.content.charAt(i),
          {
            width: 150,
            height: 150,
            padding: 5,
            delayBetweenStrokes: 100,
            radicalColor: '#ADD8E6',
            delayBetweenLoops: 2000,
          }
        );
        writer.loopCharacterAnimation();
      }, 0);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  constructor(
    private dialogRef: MatDialogRef<CharacterStrokesPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}
}
