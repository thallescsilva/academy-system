import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Discipline } from '../../../shared/models/discipline.model';
import { DisciplineService } from '../../../shared/services/discipline.service';
import { DisciplineDialogComponent } from './discipline-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatTooltipModule,
    MatDialogModule
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

              <!-- Code Column -->
              <ng-container matColumnDef="code">
                <th mat-header-cell *matHeaderCellDef>Código</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.code }}</td>
              </ng-container>

              <!-- Credits Column -->
              <ng-container matColumnDef="credits">
                <th mat-header-cell *matHeaderCellDef>Créditos</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.credits }}</td>
              </ng-container>

              <!-- Workload Column -->
              <ng-container matColumnDef="workload">
                <th mat-header-cell *matHeaderCellDef>Carga Horária</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.workload }}h</td>
              </ng-container>

              <!-- Semester Column -->
              <ng-container matColumnDef="semester">
                <th mat-header-cell *matHeaderCellDef>Semestre</th>
                <td mat-cell *matCellDef="let discipline">{{ discipline.semester?.name || '-' }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="active">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let discipline">
                  <span class="status-badge" [class]="discipline.description ? 'active' : 'inactive'">
                    {{ discipline.description ? 'Ativo' : 'Inativo' }}
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
    .disciplines-container { padding: 24px; }
    .actions-bar { margin-bottom: 16px; }
    .table-container { overflow-x: auto; }
    .disciplines-table { width: 100%; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
    .status-badge.active { background-color: #4caf50; color: white; }
    .status-badge.inactive { background-color: #f44336; color: white; }
    .loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
    @media (max-width: 768px) { .disciplines-container { padding: 16px; } }
  `]
})
export class DisciplinesComponent implements OnInit {
  disciplines: Discipline[] = [];
  displayedColumns: string[] = ['id', 'name', 'code', 'credits', 'workload', 'semester', 'actions'];
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private disciplineService: DisciplineService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDisciplines();
  }

  loadDisciplines(): void {
    this.loading = true;
    this.disciplineService.getAllDisciplines().subscribe({
      next: (items) => { this.disciplines = items; this.loading = false; },
      error: (err) => { this.loading = false; console.error(err); this.snackBar.open('Erro ao carregar disciplinas', 'Fechar', { duration: 3000 }); }
    });
  }

  createDiscipline(): void {
    const dialogRef = this.dialog.open(DisciplineDialogComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.disciplineService.createDiscipline(result).subscribe({
          next: (newDiscipline) => {
            this.disciplines.push(newDiscipline);
            this.snackBar.open('Disciplina criada com sucesso', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao criar disciplina:', error);
            this.snackBar.open('Erro ao criar disciplina', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  editDiscipline(discipline: Discipline): void {
    const dialogRef = this.dialog.open(DisciplineDialogComponent, {
      width: '500px',
      data: discipline
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.disciplineService.updateDiscipline(discipline.id!, result).subscribe({
          next: (updated) => {
            Object.assign(discipline, updated);
            this.snackBar.open('Disciplina atualizada com sucesso', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao atualizar disciplina:', error);
            this.snackBar.open('Erro ao atualizar disciplina', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteDiscipline(discipline: Discipline): void {
    if (!confirm(`Tem certeza que deseja excluir a disciplina ${discipline.name}?`)) return;
    this.disciplineService.deleteDiscipline(discipline.id!).subscribe({
      next: () => { this.disciplines = this.disciplines.filter(d => d.id !== discipline.id); this.snackBar.open('Disciplina excluída com sucesso', 'Fechar', { duration: 3000 }); },
      error: () => { this.snackBar.open('Erro ao excluir disciplina', 'Fechar', { duration: 3000 }); }
    });
  }
}
