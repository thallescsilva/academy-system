import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Course } from '../../../shared/models/course.model';
import { CourseService } from '../../../shared/services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="courses-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gerenciar Cursos</mat-card-title>
          <mat-card-subtitle>Cadastre e gerencie cursos do sistema</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="actions-bar">
            <button mat-raised-button color="primary" (click)="createCourse()">
              <mat-icon>add</mat-icon>
              Novo Curso
            </button>
          </div>

          <div class="table-container" *ngIf="!loading; else loadingTemplate">
            <table mat-table [dataSource]="courses" class="courses-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let course">{{ course.id }}</td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nome</th>
                <td mat-cell *matCellDef="let course">{{ course.name }}</td>
              </ng-container>

              <!-- Description Column -->
              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>Descrição</th>
                <td mat-cell *matCellDef="let course">{{ course.description || '-' }}</td>
              </ng-container>

              <!-- Total Hours Column -->
              <ng-container matColumnDef="totalHours">
                <th mat-header-cell *matHeaderCellDef>Carga Horária</th>
                <td mat-cell *matCellDef="let course">{{ course.totalHours }}h</td>
              </ng-container>

              <!-- Duration Column -->
              <ng-container matColumnDef="durationSemesters">
                <th mat-header-cell *matHeaderCellDef>Duração</th>
                <td mat-cell *matCellDef="let course">{{ course.durationSemesters }} semestres</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="active">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let course">
                  <span class="status-badge" [class]="course.active ? 'active' : 'inactive'">
                    {{ course.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
                <td mat-cell *matCellDef="let course">
                  <button mat-icon-button (click)="editCourse(course)" matTooltip="Editar">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="viewSemesters(course)" matTooltip="Ver Semestres">
                    <mat-icon>calendar_today</mat-icon>
                  </button>
                  <button mat-icon-button (click)="toggleCourseStatus(course)" 
                          [matTooltip]="course.active ? 'Desativar' : 'Ativar'">
                    <mat-icon>{{ course.active ? 'block' : 'check_circle' }}</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteCourse(course)" matTooltip="Excluir" color="warn">
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
              <p>Carregando cursos...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .courses-container {
      padding: 24px;
    }

    .actions-bar {
      margin-bottom: 16px;
    }

    .table-container {
      overflow-x: auto;
    }

    .courses-table {
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
      .courses-container {
        padding: 16px;
      }
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'totalHours', 'durationSemesters', 'active', 'actions'];
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar cursos:', error);
        this.snackBar.open('Erro ao carregar cursos', 'Fechar', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  createCourse(): void {
    this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', {
      duration: 3000
    });
  }

  editCourse(course: Course): void {
    this.snackBar.open(`Editando curso: ${course.name}`, 'Fechar', {
      duration: 3000
    });
  }

  viewSemesters(course: Course): void {
    this.snackBar.open(`Visualizando semestres do curso: ${course.name}`, 'Fechar', {
      duration: 3000
    });
  }

  toggleCourseStatus(course: Course): void {
    course.active = !course.active;
    this.snackBar.open(
      `Curso ${course.active ? 'ativado' : 'desativado'} com sucesso`,
      'Fechar',
      { duration: 3000 }
    );
  }

  deleteCourse(course: Course): void {
    if (confirm(`Tem certeza que deseja excluir o curso ${course.name}?`)) {
      this.courses = this.courses.filter(c => c.id !== course.id);
      this.snackBar.open('Curso excluído com sucesso', 'Fechar', {
        duration: 3000
      });
    }
  }
}
