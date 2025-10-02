import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly API_URL = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.API_URL, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.API_URL}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getCourseByCode(code: string): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/code/${code}`);
  }

  getActiveCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API_URL}/active`);
  }

  searchCoursesByName(name: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API_URL}/search?name=${name}`);
  }
}
