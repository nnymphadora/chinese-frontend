import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level } from '../models/Level';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  constructor(private http: HttpClient) {}

  getAllLevels() {
    return this.http.get<Level[]>('http://localhost:3000/levels');
  }

  getLevelByID(id: number) {
    return this.http.get<Level>(`http://localhost:3000/levels/${id}`);
  }
}
