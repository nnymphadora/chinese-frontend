import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PronunciationService {
  constructor(private http: HttpClient) {}

  getPronunciation(word: string): Observable<any> {
    const url = 'http://localhost:3001/forvo-proxy';
    const params = new HttpParams().set('word', word).set('language', 'zh');
    return this.http.get(url, { params });
  }
}
