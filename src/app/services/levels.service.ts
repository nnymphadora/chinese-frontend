import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Level } from '../models/Level';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  constructor(private http: HttpClient) {}

  getAllLevels() {
    return this.http.get<Level[]>('http://localhost:3000/levels');
  }

  getLevelById(id: number) {
    return this.http.get<Level>(`http://localhost:3000/levels/${id}`);
  }

  insertLevel(level: Level) {
    return this.http.post('http://localhost:3000/levels', level);
  }

  updateLevel(level: Level) {
    return this.http.put(`http://localhost:3000/levels/${level.id}`, level);
  }

  toggleActiveLevel(id: number, toggleActive: number) {
    return this.http.put(`http://localhost:3000/levels/${id}/toggle-active`, {
      is_active: toggleActive,
    });
  }

  softDeleteLevel(level: any) {
    return this.http.put(
      `http://localhost:3000/levels/${level.id}/delete`,
      level
    );
  }
}
