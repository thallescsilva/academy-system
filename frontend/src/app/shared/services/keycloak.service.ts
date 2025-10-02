import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Keycloak from 'keycloak-js';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8081',
      realm: 'academico',
      clientId: 'academico-frontend'
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        enableLogging: false
      });

      if (authenticated) {
        this.loadUserProfile();
      }

      return authenticated;
    } catch (error) {
      console.error('Erro ao inicializar Keycloak:', error);
      return false;
    }
  }

  async login(credentials?: { username: string; password: string }): Promise<void> {
    try {
      if (credentials) {
        // Login com credenciais diretas
        await this.keycloak.login({
          loginHint: credentials.username,
          redirectUri: window.location.origin
        });
      } else {
        // Login padrão (redirecionamento)
        await this.keycloak.login({
          redirectUri: window.location.origin
        });
      }
      
      // Após o login bem-sucedido, carregar o perfil
      if (this.keycloak.authenticated) {
        this.loadUserProfile();
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloak.logout({
        redirectUri: window.location.origin
      });
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      return await this.keycloak.updateToken(30);
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated || false;
  }

  hasRole(role: string): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    return this.keycloak.hasRealmRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    return roles.some(role => this.keycloak.hasRealmRole(role));
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getRefreshToken(): string | undefined {
    return this.keycloak.refreshToken;
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }

  getEmail(): string | undefined {
    return this.keycloak.tokenParsed?.['email'];
  }

  getRoles(): string[] {
    if (!this.isAuthenticated()) {
      return [];
    }
    return this.keycloak.realmAccess?.roles || [];
  }

  private loadUserProfile(): void {
    try {
      const roles = this.getRoles();
      const tokenParsed = this.keycloak.tokenParsed;
      
      if (!tokenParsed) {
        console.warn('Token não disponível para carregar perfil');
        return;
      }
      
      const email = tokenParsed['email'] || tokenParsed['preferred_username'] || '';
      const name = tokenParsed['name'] || this.extractNameFromEmail(email);
      
      const user: User = {
        id: parseInt(tokenParsed.sub || '0'),
        name: name,
        email: email,
        role: this.getUserRole(roles) as 'ADMIN' | 'COORDINATOR' | 'PROFESSOR' | 'STUDENT',
        active: true,
        createdAt: new Date().toISOString().split('T')[0]
      };

      this.currentUserSubject.next(user);
      console.log('Perfil do usuário carregado com sucesso:', user);
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  }

  private getUserRole(roles: string[]): string {
    if (roles.includes('ADMIN')) return 'ADMIN';
    if (roles.includes('COORDINATOR')) return 'COORDINATOR';
    if (roles.includes('PROFESSOR')) return 'PROFESSOR';
    if (roles.includes('STUDENT')) return 'STUDENT';
    return 'USER';
  }

  private extractNameFromEmail(email: string): string {
    if (!email || !email.includes('@')) return 'Usuário';
    
    const username = email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1).replace(/[._]/g, ' ');
  }

  // Métodos para compatibilidade com o AuthService antigo
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  async getAuthHeaders(): Promise<{ [key: string]: string }> {
    if (!this.isAuthenticated()) {
      return {};
    }

    const token = this.getToken();
    if (!token) {
      return {};
    }

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
}
