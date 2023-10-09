import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelDifficulty } from '../models/LevelDifficulty';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LevelDifficultyService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllLevelDifficulty() {
    return this.http.get<LevelDifficulty[]>(`${this.apiUrl}/level-difficulty`);
  }
}
