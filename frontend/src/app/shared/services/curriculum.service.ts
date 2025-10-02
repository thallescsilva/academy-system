import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculum } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private readonly API_URL = 'http://localhost:8080/api/curricula';

  constructor(private http: HttpClient) { }

  getAllCurricula(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.API_URL);
  }

  getCurriculumById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${this.API_URL}/${id}`);
  }

  createCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(this.API_URL, curriculum);
  }

  updateCurriculum(id: number, curriculum: Curriculum): Observable<Curriculum> {
    return this.http.put<Curriculum>(`${this.API_URL}/${id}`, curriculum);
  }

  deleteCurriculum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getCurriculaByStudent(studentId: number): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${this.API_URL}/student/${studentId}`);
  }

  getCurriculaByDiscipline(disciplineId: number): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${this.API_URL}/discipline/${disciplineId}`);
  }
}
