import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-dialog',
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
    <h2 mat-dialog-title>{{ data ? 'Editar Usuário' : 'Novo Usuário' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="userForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width" *ngIf="!data">
          <mat-label>Senha</mat-label>
          <input matInput type="password" formControlName="password" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Perfil</mat-label>
          <mat-select formControlName="role" required>
            <mat-option value="ADMIN">Administrador</mat-option>
            <mat-option value="COORDINATOR">Coordenador</mat-option>
            <mat-option value="PROFESSOR">Professor</mat-option>
            <mat-option value="STUDENT">Aluno</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-checkbox formControlName="active">Ativo</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!userForm.valid">
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
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: [{ value: '', disabled: !!data }, data ? [] : Validators.required],
      role: [data?.role || 'STUDENT', Validators.required],
      active: [data?.active !== undefined ? data.active : true]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      const user: User = {
        ...this.data,
        ...this.userForm.value
      };
      if (this.data) {
        delete user.password;
      }
      this.dialogRef.close(user);
    }
  }
}

