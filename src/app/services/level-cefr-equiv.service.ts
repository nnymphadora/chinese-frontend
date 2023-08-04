import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelCefrEquiv } from '../models/LevelCefrEquiv';

@Injectable({
  providedIn: 'root',
})
export class LevelCefrEquivService {
  constructor(private http: HttpClient) {}
  getAllLevelCefrEquiv() {
    return this.http.get<LevelCefrEquiv[]>(
      `http://localhost:3000/level-cefr-equivs`
    );
  }
}
