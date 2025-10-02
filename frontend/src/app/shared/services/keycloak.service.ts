import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private readonly STORAGE_KEY = 'currentUser';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  async init(): Promise<boolean> {
    // Recuperar usuário do localStorage
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        return true;
      } catch (e) {
        console.error('Erro ao recuperar usuário do localStorage:', e);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
    return true;
  }

  async login(credentials?: { username: string; password: string }): Promise<void> {
    const email = credentials?.username || 'admin@academico.com';
    const role = email.startsWith('admin') ? 'ADMIN' : 
                 email.startsWith('coordenador') ? 'COORDINATOR' : 
                 email.startsWith('professor') ? 'PROFESSOR' : 'STUDENT';
    const user: User = {
      id: 1,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: role as 'ADMIN' | 'COORDINATOR' | 'PROFESSOR' | 'STUDENT',
      active: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Salvar no localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  refreshToken(): Promise<boolean> { return Promise.resolve(true); }
  isAuthenticated(): boolean { return this.currentUserSubject.value != null; }
  hasRole(role: string): boolean { return this.currentUserSubject.value?.role === role; }
  hasAnyRole(roles: string[]): boolean { return roles.includes(this.currentUserSubject.value?.role || ''); }
  getToken(): string | undefined { return undefined; }
  getCurrentUser(): User | null { return this.currentUserSubject.value; }
  async getAuthHeaders(): Promise<{ [key: string]: string }> { return { 'Content-Type': 'application/json' }; }
}
