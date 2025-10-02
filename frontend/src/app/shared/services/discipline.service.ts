import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discipline } from '../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private readonly API_URL = 'http://localhost:8080/api/disciplines';

  constructor(private http: HttpClient) { }

  getAllDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.API_URL);
  }

  getDisciplineById(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`${this.API_URL}/${id}`);
  }

  createDiscipline(discipline: Discipline): Observable<Discipline> {
    return this.http.post<Discipline>(this.API_URL, discipline);
  }

  updateDiscipline(id: number, discipline: Discipline): Observable<Discipline> {
    return this.http.put<Discipline>(`${this.API_URL}/${id}`, discipline);
  }

  deleteDiscipline(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getDisciplinesBySemester(semesterId: number): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`${this.API_URL}/semester/${semesterId}`);
  }
}
