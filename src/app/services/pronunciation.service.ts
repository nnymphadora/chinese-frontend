import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PronunciationService {
  forvoUrl = environment.FORVO_API_URL;
  constructor(private http: HttpClient) {}

  getPronunciation(word: string): Observable<any> {
    const params = new HttpParams().set('word', word).set('language', 'zh');
    return this.http.get(this.forvoUrl, { params });
  }
}
