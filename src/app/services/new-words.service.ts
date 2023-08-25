import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewWord } from '../models/NewWord';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NewWordsService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getNewWordsByLesson(id: number) {
    return this.http.get<NewWord[]>(`${this.apiUrl}/new-words/by-lesson/${id}`);
  }

  getNewWordsByLevel(id: number) {
    return this.http.get<NewWord[]>(`${this.apiUrl}/new-words/by-level/${id}`);
  }

  insertNewWords(newWords: NewWord[]) {
    return this.http.post(`${this.apiUrl}/new-words`, newWords);
  }

  deleteNewWord(id: number) {
    return this.http.delete(`${this.apiUrl}/new-words/${id}`);
  }

  getNewWordById(id: number) {
    return this.http.get<NewWord>(`${this.apiUrl}/new-words/${id}`);
  }
}
