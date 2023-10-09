import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../models/Lesson';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllLessonsByLevelId(id: number) {
    return this.http.get<Lesson[]>(`${this.apiUrl}/lessons/by-level/${id}`);
  }

  getLessonById(id: number) {
    return this.http.get<Lesson>(`${this.apiUrl}/lessons/${id}`);
  }

  insertLesson(lesson: Lesson) {
    return this.http.post(`${this.apiUrl}/lessons`, lesson);
  }

  updateLesson(lesson: Lesson) {
    return this.http.put(`${this.apiUrl}/lessons/${lesson.id}`, lesson);
  }

  toggleActiveLesson(id: number, toggleActive: number) {
    return this.http.put(`${this.apiUrl}/lessons/${id}/toggle-active`, {
      is_active: toggleActive,
    });
  }

  softDeleteLesson(lesson: Lesson) {
    return this.http.put(`${this.apiUrl}/lessons/${lesson.id}/delete`, lesson);
  }
}
