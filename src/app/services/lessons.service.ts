import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../models/Lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  constructor(private http: HttpClient) {}

  getAllLessonsByLevelId(id: number) {
    return this.http.get<Lesson[]>(
      `http://localhost:3000/lessons/by-level/${id}`
    );
  }
}
