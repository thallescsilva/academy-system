import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Discipline } from '../models/course.model';

@Component({
  selector: 'app-discipline-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>book</mat-icon>
      {{ discipline.name }}
    </h2>
    <mat-dialog-content>
      <div class="detail-section">
        <h3>Informações Gerais</h3>
        <div class="detail-row">
          <span class="label">Nome:</span>
          <span class="value">{{ discipline.name }}</span>
        </div>
        <div class="detail-row" *ngIf="discipline.description">
          <span class="label">Descrição:</span>
          <span class="value">{{ discipline.description }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Carga Horária:</span>
          <span class="value">{{ discipline.workload }}h</span>
        </div>
        <div class="detail-row" *ngIf="discipline.semesterNumber">
          <span class="label">Semestre:</span>
          <span class="value">{{ discipline.semesterNumber }}º Semestre</span>
        </div>
        <div class="detail-row" *ngIf="discipline.courseName">
          <span class="label">Curso:</span>
          <span class="value">{{ discipline.courseName }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Status:</span>
          <mat-chip [class]="discipline.active ? 'active-chip' : 'inactive-chip'">
            {{ discipline.active ? 'Ativa' : 'Inativa' }}
          </mat-chip>
        </div>
      </div>

      <div class="detail-section" *ngIf="discipline.createdAt">
        <h3>Informações Adicionais</h3>
        <div class="detail-row">
          <span class="label">Criada em:</span>
          <span class="value">{{ discipline.createdAt | date: 'dd/MM/yyyy HH:mm' }}</span>
        </div>
        <div class="detail-row" *ngIf="discipline.updatedAt">
          <span class="label">Última atualização:</span>
          <span class="value">{{ discipline.updatedAt | date: 'dd/MM/yyyy HH:mm' }}</span>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Fechar</button>
      <button mat-raised-button color="primary" (click)="onEdit()">
        <mat-icon>edit</mat-icon>
        Editar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    mat-dialog-content {
      min-width: 500px;
      padding: 20px;
    }

    .detail-section {
      margin-bottom: 24px;
    }

    .detail-section h3 {
      color: #3f51b5;
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
    }

    .detail-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 500;
      color: #666;
      min-width: 180px;
    }

    .value {
      color: #333;
      flex: 1;
    }

    .active-chip {
      background-color: #4caf50 !important;
      color: white;
    }

    .inactive-chip {
      background-color: #f44336 !important;
      color: white;
    }

    mat-dialog-actions {
      padding: 16px 20px;
    }
  `]
})
export class DisciplineDetailsDialogComponent {
  discipline: Discipline;

  constructor(
    public dialogRef: MatDialogRef<DisciplineDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { discipline: Discipline }
  ) {
    this.discipline = data.discipline;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.dialogRef.close({ action: 'edit', discipline: this.discipline });
  }
}

