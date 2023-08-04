import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelDifficulty } from '../models/LevelDifficulty';

@Injectable({
  providedIn: 'root',
})
export class LevelDifficultyService {
  constructor(private http: HttpClient) {}

  getAllLevelDifficulty() {
    return this.http.get<LevelDifficulty[]>(
      `http://localhost:3000/level-difficulty`
    );
  }
}
