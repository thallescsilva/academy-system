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

import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { UserDialogComponent } from './user-dialog.component';

@Component({
  selector: 'app-users',
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
    <div class="users-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gerenciar Usuários</mat-card-title>
          <mat-card-subtitle>Cadastre e gerencie usuários do sistema</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="actions-bar">
            <button mat-raised-button color="primary" (click)="createUser()">
              <mat-icon>add</mat-icon>
              Novo Usuário
            </button>
          </div>

          <div class="table-container" *ngIf="!loading; else loadingTemplate">
            <table mat-table [dataSource]="users" class="users-table">
              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let user">{{ user.id }}</td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nome</th>
                <td mat-cell *matCellDef="let user">{{ user.name }}</td>
              </ng-container>

              <!-- Email Column -->
              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let user">{{ user.email }}</td>
              </ng-container>

              <!-- Role Column -->
              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef>Papel</th>
                <td mat-cell *matCellDef="let user">
                  <span class="role-badge" [class]="'role-' + user.role.toLowerCase()">
                    {{ getRoleDescription(user.role) }}
                  </span>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="active">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let user">
                  <span class="status-badge" [class]="user.active ? 'active' : 'inactive'">
                    {{ user.active ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
                <td mat-cell *matCellDef="let user">
                  <button mat-icon-button (click)="editUser(user)" matTooltip="Editar">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="toggleUserStatus(user)" 
                          [matTooltip]="user.active ? 'Desativar' : 'Ativar'">
                    <mat-icon>{{ user.active ? 'block' : 'check_circle' }}</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteUser(user)" matTooltip="Excluir" color="warn">
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
              <p>Carregando usuários...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 24px;
    }

    .actions-bar {
      margin-bottom: 16px;
    }

    .table-container {
      overflow-x: auto;
    }

    .users-table {
      width: 100%;
    }

    .role-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .role-admin {
      background-color: #f44336;
      color: white;
    }

    .role-coordinator {
      background-color: #ff9800;
      color: white;
    }

    .role-professor {
      background-color: #2196f3;
      color: white;
    }

    .role-student {
      background-color: #4caf50;
      color: white;
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
      .users-container {
        padding: 16px;
      }
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'active', 'actions'];
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.snackBar.open('Erro ao carregar usuários', 'Fechar', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  createUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: (newUser) => {
            this.users.push(newUser);
            this.snackBar.open('Usuário criado com sucesso', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao criar usuário:', error);
            this.snackBar.open('Erro ao criar usuário', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id!, result).subscribe({
          next: (updated) => {
            Object.assign(user, updated);
            this.snackBar.open('Usuário atualizado com sucesso', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.snackBar.open('Erro ao atualizar usuário', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  toggleUserStatus(user: User): void {
    const updatedUser = { ...user, active: !user.active };
    this.userService.updateUser(user.id!, updatedUser).subscribe({
      next: () => {
        user.active = !user.active;
        this.snackBar.open(
          `Usuário ${user.active ? 'ativado' : 'desativado'} com sucesso`,
          'Fechar',
          { duration: 3000 }
        );
      },
      error: (error) => {
        console.error('Erro ao atualizar usuário:', error);
        this.snackBar.open('Erro ao atualizar usuário', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  deleteUser(user: User): void {
    if (confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.snackBar.open('Usuário excluído com sucesso', 'Fechar', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
          this.snackBar.open('Erro ao excluir usuário', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  getRoleDescription(role: string): string {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'COORDINATOR':
        return 'Coordenador';
      case 'PROFESSOR':
        return 'Professor';
      case 'STUDENT':
        return 'Aluno';
      default:
        return 'Usuário';
    }
  }
}
