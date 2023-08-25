import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelCefrEquiv } from '../models/LevelCefrEquiv';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LevelCefrEquivService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}
  getAllLevelCefrEquiv() {
    return this.http.get<LevelCefrEquiv[]>(`${this.apiUrl}/level-cefr-equivs`);
  }
}
