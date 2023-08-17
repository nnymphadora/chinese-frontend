import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewWord } from '../models/NewWord';

@Injectable({
  providedIn: 'root',
})
export class NewWordsService {
  constructor(private http: HttpClient) {}

  getNewWordsByLesson(id: number) {
    return this.http.get<NewWord[]>(
      `http://localhost:3000/new-words/by-lesson/${id}`
    );
  }

  getNewWordsByLevel(id: number) {
    return this.http.get<NewWord[]>(
      `http://localhost:3000/new-words/by-level/${id}`
    );
  }

  insertNewWords(newWords: NewWord[]) {
    return this.http.post('http://localhost:3000/new-words', newWords);
  }

  deleteNewWord(id: number) {
    return this.http.delete(`http://localhost:3000/new-words/${id}`);
  }
}
