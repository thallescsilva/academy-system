import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Discipline } from '../../../shared/models/course.model';
import { SemesterService } from '../../../shared/services/semester.service';

@Component({
  selector: 'app-discipline-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Disciplina' : 'Nova Disciplina' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="disciplineForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Carga Horária</mat-label>
          <input matInput type="number" formControlName="workload" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Semestre</mat-label>
          <mat-select formControlName="semesterId" required>
            <mat-option *ngFor="let semester of semesters" [value]="semester.id">
              {{ semester.name || 'Semestre ' + semester.number }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-checkbox formControlName="active">Ativa</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!disciplineForm.valid">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-dialog-content {
      min-width: 400px;
      padding: 20px;
    }
  `]
})
export class DisciplineDialogComponent {
  disciplineForm: FormGroup;
  semesters: any[] = [];

  constructor(
    private fb: FormBuilder,
    private semesterService: SemesterService,
    public dialogRef: MatDialogRef<DisciplineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Discipline | null
  ) {
    this.disciplineForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || ''],
      workload: [data?.workload || 0, [Validators.required, Validators.min(1)]],
      semesterId: [data?.semesterId || null, Validators.required],
      active: [data?.active !== undefined ? data.active : true]
    });

    this.loadSemesters();
  }

  loadSemesters(): void {
    this.semesterService.getAllSemesters().subscribe({
      next: (semesters) => {
        this.semesters = semesters;
      },
      error: (error) => {
        console.error('Erro ao carregar semestres:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.disciplineForm.valid) {
      const discipline: Discipline = {
        ...this.data,
        ...this.disciplineForm.value
      };
      this.dialogRef.close(discipline);
    }
  }
}

