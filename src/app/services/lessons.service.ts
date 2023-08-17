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

  getLessonById(id: number) {
    return this.http.get<Lesson>(`http://localhost:3000/lessons/${id}`);
  }

  insertLesson(lesson: Lesson) {
    return this.http.post('http://localhost:3000/lessons', lesson);
  }

  updateLesson(lesson: Lesson) {
    return this.http.put(`http://localhost:3000/lessons/${lesson.id}`, lesson);
  }

  toggleActiveLesson(id: number, toggleActive: number) {
    return this.http.put(`http://localhost:3000/lessons/${id}/toggle-active`, {
      is_active: toggleActive,
    });
  }

  softDeleteLesson(lesson: any) {
    return this.http.put(
      `http://localhost:3000/lessons/${lesson.id}/delete`,
      lesson
    );
  }
}
