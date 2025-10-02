import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Semester } from '../../../shared/models/course.model';

@Component({
  selector: 'app-semesters',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  template: `
    <div class="semesters-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gerenciar Semestres</mat-card-title>
          <mat-card-subtitle>Cadastre e gerencie semestres dos cursos</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="actions-bar">
            <button mat-raised-button color="primary" (click)="createSemester()">
              <mat-icon>add</mat-icon>
              Novo Semestre
            </button>
          </div>

          <div class="table-container" *ngIf="!loading; else loadingTemplate">
            <table mat-table [dataSource]="semesters" class="semesters-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let semester">{{ semester.id }}</td>
              </ng-container>

              <!-- Number Column -->
              <ng-container matColumnDef="number">
                <th mat-header-cell *matHeaderCellDef>Número</th>
                <td mat-cell *matCellDef="let semester">{{ semester.number }}º Semestre</td>
              </ng-container>

              <!-- Course Column -->
              <ng-container matColumnDef="courseName">
                <th mat-header-cell *matHeaderCellDef>Curso</th>
                <td mat-cell *matCellDef="let semester">{{ semester.courseName }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="active">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let semester">
                  <span class="status-badge" [class]="semester.active ? 'active' : 'inactive'">
                    {{ semester.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
                <td mat-cell *matCellDef="let semester">
                  <button mat-icon-button (click)="editSemester(semester)" matTooltip="Editar semestre">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="viewDisciplines(semester)" matTooltip="Visualizar disciplinas do semestre">
                    <mat-icon>book</mat-icon>
                  </button>
                  <button mat-icon-button (click)="toggleSemesterStatus(semester)" 
                          [matTooltip]="semester.active ? 'Desativar semestre' : 'Ativar semestre'">
                    <mat-icon>{{ semester.active ? 'block' : 'check_circle' }}</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteSemester(semester)" matTooltip="Excluir semestre" color="warn">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <ng-template #loadingTemplate>
            <div class="loading-container">
              <mat-spinner></mat-spinner>
              <p>Carregando semestres...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .semesters-container {
      padding: 24px;
    }

    .actions-bar {
      margin-bottom: 16px;
    }

    .table-container {
      overflow-x: auto;
    }

    .semesters-table {
      width: 100%;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.active {
      background-color: #4caf50;
      color: white;
    }

    .status-badge.inactive {
      background-color: #f44336;
      color: white;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    @media (max-width: 768px) {
      .semesters-container {
        padding: 16px;
      }
    }
  `]
})
export class SemestersComponent implements OnInit {
  semesters: Semester[] = [];
  displayedColumns: string[] = ['id', 'number', 'courseName', 'active', 'actions'];
  loading = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSemesters();
  }

  loadSemesters(): void {
    this.loading = true;
    // TODO: Implementar chamada para o serviço de semestres
    setTimeout(() => {
      this.semesters = [
        { id: 1, number: 1, courseName: 'Ciência da Computação', active: true },
        { id: 2, number: 2, courseName: 'Ciência da Computação', active: true },
        { id: 3, number: 3, courseName: 'Ciência da Computação', active: true },
        { id: 4, number: 4, courseName: 'Ciência da Computação', active: true },
        { id: 5, number: 5, courseName: 'Ciência da Computação', active: true },
        { id: 6, number: 6, courseName: 'Ciência da Computação', active: true },
        { id: 7, number: 7, courseName: 'Ciência da Computação', active: true },
        { id: 8, number: 8, courseName: 'Ciência da Computação', active: true }
      ];
      this.loading = false;
    }, 1000);
  }

  createSemester(): void {
    this.snackBar.open('Funcionalidade de criação de semestre em desenvolvimento', 'Fechar', {
      duration: 3000
    });
  }

  editSemester(semester: Semester): void {
    this.snackBar.open(`Editando semestre: ${semester.number}º semestre`, 'Fechar', {
      duration: 3000
    });
  }

  viewDisciplines(semester: Semester): void {
    this.snackBar.open(`Visualizando disciplinas do ${semester.number}º semestre`, 'Fechar', {
      duration: 3000
    });
  }

  toggleSemesterStatus(semester: Semester): void {
    semester.active = !semester.active;
    this.snackBar.open(
      `Semestre ${semester.active ? 'ativado' : 'desativado'} com sucesso`,
      'Fechar',
      { duration: 3000 }
    );
  }

  deleteSemester(semester: Semester): void {
    if (confirm(`Tem certeza que deseja excluir o ${semester.number}º semestre?`)) {
      this.semesters = this.semesters.filter(s => s.id !== semester.id);
      this.snackBar.open('Semestre excluído com sucesso', 'Fechar', {
        duration: 3000
      });
    }
  }
}
