import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { KeycloakService } from './shared/services/keycloak.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="(isHandset$ | async) === false">
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          <button mat-list-item (click)="navigateTo('/dashboard')">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </button>
          
          <ng-container *ngIf="currentUser?.role === 'ADMIN'">
            <button mat-list-item (click)="navigateTo('/admin/users')">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>Usuários</span>
            </button>
          </ng-container>
          
          <ng-container *ngIf="currentUser?.role === 'COORDINATOR'">
            <button mat-list-item (click)="navigateTo('/coordinator/courses')">
              <mat-icon matListItemIcon>school</mat-icon>
              <span matListItemTitle>Cursos</span>
            </button>
            <button mat-list-item (click)="navigateTo('/coordinator/semesters')">
              <mat-icon matListItemIcon>calendar_today</mat-icon>
              <span matListItemTitle>Semestres</span>
            </button>
            <button mat-list-item (click)="navigateTo('/coordinator/disciplines')">
              <mat-icon matListItemIcon>book</mat-icon>
              <span matListItemTitle>Disciplinas</span>
            </button>
            <button mat-list-item (click)="navigateTo('/coordinator/curriculum')">
              <mat-icon matListItemIcon>assignment</mat-icon>
              <span matListItemTitle>Matriz Curricular</span>
            </button>
          </ng-container>
          
          <ng-container *ngIf="currentUser?.role === 'PROFESSOR' || currentUser?.role === 'STUDENT'">
            <button mat-list-item (click)="navigateTo('/curriculum')">
              <mat-icon matListItemIcon>assignment</mat-icon>
              <span matListItemTitle>Matriz Curricular</span>
            </button>
          </ng-container>
        </mat-nav-list>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          
          <span>Sistema Acadêmico</span>
          
          <span class="spacer"></span>
          
          <button mat-icon-button [matMenuTriggerFor]="userMenu" *ngIf="currentUser">
            <mat-icon>account_circle</mat-icon>
          </button>
          
          <mat-menu #userMenu="matMenu">
            <div mat-menu-item disabled>
              <mat-icon>person</mat-icon>
              <span>{{ currentUser?.name }}</span>
            </div>
            <div mat-menu-item disabled>
              <mat-icon>email</mat-icon>
              <span>{{ currentUser?.email }}</span>
            </div>
            <div mat-menu-item disabled>
              <mat-icon>admin_panel_settings</mat-icon>
              <span>{{ getRoleDescription(currentUser?.role) }}</span>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Sair</span>
            </button>
          </mat-menu>
        </mat-toolbar>
        
        <div class="sidenav-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Sistema Acadêmico';
  currentUser: User | null = null;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private keycloakService: KeycloakService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    // Inicializar Keycloak
    const isAuthenticated = await this.keycloakService.init();
    
    // Subscrever ao usuário atual
    this.keycloakService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Se autenticado e estiver na página de login, redirecionar para dashboard
    if (isAuthenticated && this.router.url === '/login') {
      this.router.navigate(['/dashboard']);
    }
    // Se não estiver autenticado e não estiver na página de login, redirecionar para login
    else if (!isAuthenticated && this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloakService.logout();
      this.router.navigate(['/login']);
      this.snackBar.open('Logout realizado com sucesso', 'Fechar', {
        duration: 3000
      });
    } catch (error) {
      this.snackBar.open('Erro ao fazer logout', 'Fechar', {
        duration: 3000
      });
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getRoleDescription(role: string | undefined): string {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'COORDINATOR':
        return 'Coordenador';
      case 'PROFESSOR':
        return 'Professor';
      case 'STUDENT':
        return 'Aluno';
      default:
        return 'Usuário';
    }
  }
}
