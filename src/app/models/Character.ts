export class Character {
  content: string;
  containedInWord: string;
  wordMeaning: string;
  indexInWord: number;

  constructor(
    content: string,
    containedInWord: string,
    wordMeaning: string,
    indexInWord: number
  ) {
    this.content = content;
    this.containedInWord = containedInWord;
    this.indexInWord = indexInWord;
    this.wordMeaning = wordMeaning;
  }
}
