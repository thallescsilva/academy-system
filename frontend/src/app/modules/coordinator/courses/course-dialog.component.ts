import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Course } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Curso' : 'Novo Curso' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="courseForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="courseForm.get('name')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Carga Horária Total</mat-label>
          <input matInput type="number" formControlName="totalHours" required>
          <mat-error *ngIf="courseForm.get('totalHours')?.hasError('required')">
            Carga horária é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Duração (semestres)</mat-label>
          <input matInput type="number" formControlName="durationSemesters" required>
          <mat-error *ngIf="courseForm.get('durationSemesters')?.hasError('required')">
            Duração é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-checkbox formControlName="active">Ativo</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!courseForm.valid">
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

    mat-dialog-actions {
      padding: 16px 20px;
    }
  `]
})
export class CourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course | null
  ) {
    this.courseForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || ''],
      totalHours: [data?.totalHours || 0, [Validators.required, Validators.min(0)]],
      durationSemesters: [data?.durationSemesters || 0, [Validators.required, Validators.min(1)]],
      active: [data?.active !== undefined ? data.active : true]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.courseForm.valid) {
      const course: Course = {
        ...this.data,
        ...this.courseForm.value
      };
      this.dialogRef.close(course);
    }
  }
}

