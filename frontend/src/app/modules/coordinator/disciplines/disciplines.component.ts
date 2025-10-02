import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Discipline } from '../../../shared/models/course.model';

@Component({
  selector: 'app-disciplines',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  template: `
    <div class="disciplines-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gerenciar Disciplinas</mat-card-title>
          <mat-card-subtitle>Cadastre e gerencie disciplinas dos cursos</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="actions-bar">
            <button mat-raised-button color="primary" (click)="createDiscipline()">
              <mat-icon>add</mat-icon>
              Nova Disciplina
            </button>
          </div>

          <div class="table-container" *ngIf="!loading; else loadingTemplate">
            <table mat-table [dataSource]="disciplines" class="disciplines-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.id }}</td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nome</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.name }}</td>
              </ng-container>

              <!-- Workload Column -->
              <ng-container matColumnDef="workload">
                <th mat-header-cell *matHeaderCellDef>Carga Horária</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.workload }}h</td>
              </ng-container>

              <!-- Semester Column -->
              <ng-container matColumnDef="semesterNumber">
                <th mat-header-cell *matHeaderCellDef>Semestre</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.semesterNumber }}º</td>
              </ng-container>

              <!-- Course Column -->
              <ng-container matColumnDef="courseName">
                <th mat-header-cell *matHeaderCellDef>Curso</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.courseName }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="active">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let discipline">
                  <span class="status-badge" [class]="discipline.active ? 'active' : 'inactive'">
                    {{ discipline.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
                <td mat-cell *matCellDef="let discipline">
                  <button mat-icon-button (click)="editDiscipline(discipline)" matTooltip="Editar">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="toggleDisciplineStatus(discipline)" 
                          [matTooltip]="discipline.active ? 'Desativar' : 'Ativar'">
                    <mat-icon>{{ discipline.active ? 'block' : 'check_circle' }}</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteDiscipline(discipline)" matTooltip="Excluir" color="warn">
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
              <p>Carregando disciplinas...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .disciplines-container {
      padding: 24px;
    }

    .actions-bar {
      margin-bottom: 16px;
    }

    .table-container {
      overflow-x: auto;
    }

    .disciplines-table {
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
      .disciplines-container {
        padding: 16px;
      }
    }
  `]
})
export class DisciplinesComponent implements OnInit {
  disciplines: Discipline[] = [];
  displayedColumns: string[] = ['id', 'name', 'workload', 'semesterNumber', 'courseName', 'active', 'actions'];
  loading = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadDisciplines();
  }

  loadDisciplines(): void {
    this.loading = true;
    // TODO: Implementar chamada para o serviço de disciplinas
    setTimeout(() => {
      this.disciplines = [
        { id: 1, name: 'Algoritmos e Programação I', workload: 80, semesterNumber: 1, courseName: 'Ciência da Computação', active: true },
        { id: 2, name: 'Matemática Discreta', workload: 80, semesterNumber: 1, courseName: 'Ciência da Computação', active: true },
        { id: 3, name: 'Cálculo I', workload: 80, semesterNumber: 1, courseName: 'Ciência da Computação', active: true },
        { id: 4, name: 'Algoritmos e Programação II', workload: 80, semesterNumber: 2, courseName: 'Ciência da Computação', active: true },
        { id: 5, name: 'Estruturas de Dados', workload: 80, semesterNumber: 2, courseName: 'Ciência da Computação', active: true },
        { id: 6, name: 'Programação Orientada a Objetos', workload: 80, semesterNumber: 3, courseName: 'Ciência da Computação', active: true },
        { id: 7, name: 'Banco de Dados I', workload: 80, semesterNumber: 3, courseName: 'Ciência da Computação', active: true }
      ];
      this.loading = false;
    }, 1000);
  }

  createDiscipline(): void {
    this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', {
      duration: 3000
    });
  }

  editDiscipline(discipline: Discipline): void {
    this.snackBar.open(`Editando disciplina: ${discipline.name}`, 'Fechar', {
      duration: 3000
    });
  }

  toggleDisciplineStatus(discipline: Discipline): void {
    discipline.active = !discipline.active;
    this.snackBar.open(
      `Disciplina ${discipline.active ? 'ativada' : 'desativada'} com sucesso`,
      'Fechar',
      { duration: 3000 }
    );
  }

  deleteDiscipline(discipline: Discipline): void {
    if (confirm(`Tem certeza que deseja excluir a disciplina ${discipline.name}?`)) {
      this.disciplines = this.disciplines.filter(d => d.id !== discipline.id);
      this.snackBar.open('Disciplina excluída com sucesso', 'Fechar', {
        duration: 3000
      });
    }
  }
}
