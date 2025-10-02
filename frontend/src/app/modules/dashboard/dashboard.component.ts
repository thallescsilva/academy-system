import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

import { KeycloakService } from '../../shared/services/keycloak.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="welcome-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Bem-vindo, {{ currentUser?.name }}!</mat-card-title>
            <mat-card-subtitle>{{ getRoleDescription(currentUser?.role) }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Selecione uma das opções abaixo para começar:</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="actions-grid">
        <mat-card *ngIf="currentUser?.role === 'ADMIN'" class="action-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>people</mat-icon>
            <mat-card-title>Usuários</mat-card-title>
            <mat-card-subtitle>Gerenciar usuários do sistema</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Cadastre, edite e gerencie usuários do sistema.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/admin/users">
              <mat-icon>arrow_forward</mat-icon>
              Acessar
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card *ngIf="currentUser?.role === 'COORDINATOR'" class="action-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>school</mat-icon>
            <mat-card-title>Cursos</mat-card-title>
            <mat-card-subtitle>Gerenciar cursos</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Cadastre e gerencie cursos do sistema.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/coordinator/courses">
              <mat-icon>arrow_forward</mat-icon>
              Acessar
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card *ngIf="currentUser?.role === 'COORDINATOR'" class="action-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>calendar_today</mat-icon>
            <mat-card-title>Semestres</mat-card-title>
            <mat-card-subtitle>Gerenciar semestres</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Cadastre e gerencie semestres dos cursos.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/coordinator/semesters">
              <mat-icon>arrow_forward</mat-icon>
              Acessar
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card *ngIf="currentUser?.role === 'COORDINATOR'" class="action-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>book</mat-icon>
            <mat-card-title>Disciplinas</mat-card-title>
            <mat-card-subtitle>Gerenciar disciplinas</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Cadastre e gerencie disciplinas dos cursos.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/coordinator/disciplines">
              <mat-icon>arrow_forward</mat-icon>
              Acessar
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card *ngIf="currentUser?.role === 'COORDINATOR'" class="action-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>assignment</mat-icon>
            <mat-card-title>Matriz Curricular</mat-card-title>
            <mat-card-subtitle>Montar matriz curricular</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Monte e gerencie a matriz curricular dos cursos.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/coordinator/curriculum">
              <mat-icon>arrow_forward</mat-icon>
              Acessar
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card *ngIf="currentUser?.role === 'PROFESSOR' || currentUser?.role === 'STUDENT'" class="action-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>assignment</mat-icon>
            <mat-card-title>Matriz Curricular</mat-card-title>
            <mat-card-subtitle>Visualizar matriz curricular</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Visualize a matriz curricular dos cursos.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/curriculum">
              <mat-icon>arrow_forward</mat-icon>
              Acessar
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }

    .welcome-card {
      margin-bottom: 24px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .action-card {
      height: 100%;
    }

    .action-card mat-card-header {
      margin-bottom: 16px;
    }

    .action-card mat-card-content {
      margin-bottom: 16px;
    }

    .action-card mat-card-actions {
      padding: 16px;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
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
