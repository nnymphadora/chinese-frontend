import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level } from '../models/Level';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllLevels() {
    return this.http.get<Level[]>(`${this.apiUrl}/levels`);
  }

  getLevelById(id: number) {
    return this.http.get<Level>(`${this.apiUrl}/${id}`);
  }

  insertLevel(level: Level) {
    return this.http.post('${this.apiUrl}/levels', level);
  }

  updateLevel(level: Level) {
    return this.http.put(`${this.apiUrl}/levels/${level.id}`, level);
  }

  toggleActiveLevel(id: number, toggleActive: number) {
    return this.http.put(`${this.apiUrl}/levels/${id}/toggle-active`, {
      is_active: toggleActive,
    });
  }

  softDeleteLevel(level: any) {
    return this.http.put(`${this.apiUrl}/${level.id}/delete`, level);
  }
}
