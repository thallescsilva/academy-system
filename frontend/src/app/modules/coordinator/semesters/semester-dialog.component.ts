import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Semester } from '../../../shared/models/semester.model';
import { CourseService } from '../../../shared/services/course.service';

@Component({
  selector: 'app-semester-dialog',
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
    <h2 mat-dialog-title>{{ data ? 'Editar Semestre' : 'Novo Semestre' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="semesterForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome (opcional)</mat-label>
          <input matInput formControlName="name" placeholder="Ex: 2024.1">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Número do Semestre</mat-label>
          <input matInput type="number" formControlName="number" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Data de Início (opcional)</mat-label>
          <input matInput type="date" formControlName="startDate">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Data de Término (opcional)</mat-label>
          <input matInput type="date" formControlName="endDate">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Curso</mat-label>
          <mat-select formControlName="courseId" required>
            <mat-option *ngFor="let course of courses" [value]="course.id">
              {{ course.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-checkbox formControlName="active">Ativo</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!semesterForm.valid">
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
export class SemesterDialogComponent {
  semesterForm: FormGroup;
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<SemesterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Semester | null
  ) {
    this.semesterForm = this.fb.group({
      name: [data?.name || ''],
      number: [data?.number || 1, [Validators.required, Validators.min(1)]],
      startDate: [data?.startDate || ''],
      endDate: [data?.endDate || ''],
      courseId: [data?.courseId || null, Validators.required],
      active: [data?.active !== undefined ? data.active : true]
    });

    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Erro ao carregar cursos:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.semesterForm.valid) {
      const semester: Semester = {
        ...this.data,
        ...this.semesterForm.value
      };
      this.dialogRef.close(semester);
    }
  }
}

