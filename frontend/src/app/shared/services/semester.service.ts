import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Semester } from '../models/semester.model';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  private readonly API_URL = 'http://localhost:8080/api/semesters';

  constructor(private http: HttpClient) { }

  getAllSemesters(): Observable<Semester[]> {
    return this.http.get<Semester[]>(this.API_URL);
  }

  getSemesterById(id: number): Observable<Semester> {
    return this.http.get<Semester>(`${this.API_URL}/${id}`);
  }

  createSemester(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(this.API_URL, semester);
  }

  updateSemester(id: number, semester: Semester): Observable<Semester> {
    return this.http.put<Semester>(`${this.API_URL}/${id}`, semester);
  }

  deleteSemester(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getSemestersByCourse(courseId: number): Observable<Semester[]> {
    return this.http.get<Semester[]>(`${this.API_URL}/course/${courseId}`);
  }
}
