import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { KeycloakService } from '../../../shared/services/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Sistema Acadêmico</mat-card-title>
          <mat-card-subtitle>Faça login para continuar</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="form-field" appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="seu@email.com">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Email deve ter formato válido
              </mat-error>
            </mat-form-field>

            <mat-form-field class="form-field" appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Senha deve ter no mínimo 6 caracteres
              </mat-error>
            </mat-form-field>

            <div class="button-group">
              <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || loading">
                <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
                <span *ngIf="!loading">Entrar</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 24px;
    }

    .form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .button-group {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }

    mat-card-title {
      text-align: center;
      color: #1976d2;
    }

    mat-card-subtitle {
      text-align: center;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private keycloakService: KeycloakService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Redirect if already authenticated
    if (this.keycloakService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.loading = true;
      
      try {
        const credentials = {
          username: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        };
        
        await this.keycloakService.login(credentials);
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/dashboard']);
      } catch (error) {
        this.snackBar.open('Erro ao fazer login. Verifique suas credenciais.', 'Fechar', {
          duration: 5000
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
