import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';

@Injectable({
  providedIn: 'root',
})
export class PronunciationService {
  private apiKey = environment.forvoApiKey;
  private baseUrl = 'https://apifree.forvo.com/action';

  constructor(private http: HttpClient) {}

  getAudioPronunciation(word: string): Observable<any> {
    const url = `${
      this.baseUrl
    }/word-pronunciations/format/json/word/${encodeURIComponent(
      word
    )}/language/zh/key/${this.apiKey}`;

    return this.http.get(url);
  }
}
