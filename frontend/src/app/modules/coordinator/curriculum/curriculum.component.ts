import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CurriculumMatrix, SemesterDisciplines } from '../../../shared/models/course.model';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="curriculum-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Matriz Curricular</mat-card-title>
          <mat-card-subtitle>Monte e gerencie a matriz curricular dos cursos</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="actions-bar">
            <button mat-raised-button color="primary" (click)="createCurriculum()">
              <mat-icon>add</mat-icon>
              Nova Matriz
            </button>
            <button mat-raised-button color="accent" (click)="exportCurriculum()">
              <mat-icon>download</mat-icon>
              Exportar
            </button>
          </div>

          <div class="curriculum-content" *ngIf="!loading; else loadingTemplate">
            <div class="course-info" *ngIf="curriculumMatrix">
              <h2>{{ curriculumMatrix.courseName }}</h2>
              <p>Total de semestres: {{ curriculumMatrix.semesters.length }}</p>
            </div>

            <mat-accordion multi="true">
              <mat-expansion-panel *ngFor="let semester of curriculumMatrix?.semesters" [expanded]="true">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon>calendar_today</mat-icon>
                    {{ semester.semesterNumber }}º Semestre
                  </mat-panel-title>
                  <mat-panel-description>
                    {{ semester.disciplines.length }} disciplina(s)
                  </mat-panel-description>
                </mat-expansion-panel-header>

                <div class="disciplines-grid">
                  <mat-card *ngFor="let discipline of semester.disciplines" class="discipline-card">
                    <mat-card-header>
                      <mat-card-title>{{ discipline.name }}</mat-card-title>
                      <mat-card-subtitle>{{ discipline.workload }}h</mat-card-subtitle>
                    </mat-card-header>
                    <mat-card-content *ngIf="discipline.description">
                      <p>{{ discipline.description }}</p>
                    </mat-card-content>
                    <mat-card-actions>
                      <button mat-icon-button (click)="editDiscipline(discipline)" matTooltip="Editar">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button (click)="removeDiscipline(discipline)" matTooltip="Remover" color="warn">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </mat-card-actions>
                  </mat-card>
                </div>

                <div class="semester-actions">
                  <button mat-button color="primary" (click)="addDisciplineToSemester(semester)">
                    <mat-icon>add</mat-icon>
                    Adicionar Disciplina
                  </button>
                </div>
              </mat-expansion-panel>
            </mat-accordion>
          </div>

          <ng-template #loadingTemplate>
            <div class="loading-container">
              <mat-spinner></mat-spinner>
              <p>Carregando matriz curricular...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .curriculum-container {
      padding: 24px;
    }

    .actions-bar {
      margin-bottom: 24px;
      display: flex;
      gap: 16px;
    }

    .course-info {
      margin-bottom: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .course-info h2 {
      margin: 0 0 8px 0;
      color: #1976d2;
    }

    .disciplines-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }

    .discipline-card {
      height: fit-content;
    }

    .semester-actions {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    @media (max-width: 768px) {
      .curriculum-container {
        padding: 16px;
      }
      
      .disciplines-grid {
        grid-template-columns: 1fr;
      }
      
      .actions-bar {
        flex-direction: column;
      }
    }
  `]
})
export class CurriculumComponent implements OnInit {
  curriculumMatrix: CurriculumMatrix | null = null;
  loading = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCurriculum();
  }

  loadCurriculum(): void {
    this.loading = true;
    // TODO: Implementar chamada para o serviço de matriz curricular
    setTimeout(() => {
      this.curriculumMatrix = {
        courseId: 1,
        courseName: 'Ciência da Computação',
        semesters: [
          {
            semesterId: 1,
            semesterNumber: 1,
            disciplines: [
              { id: 1, name: 'Algoritmos e Programação I', workload: 80, description: 'Fundamentos de programação' },
              { id: 2, name: 'Matemática Discreta', workload: 80, description: 'Fundamentos de matemática' },
              { id: 3, name: 'Cálculo I', workload: 80, description: 'Cálculo diferencial' },
              { id: 4, name: 'Introdução à Computação', workload: 40, description: 'História da computação' }
            ]
          },
          {
            semesterId: 2,
            semesterNumber: 2,
            disciplines: [
              { id: 5, name: 'Algoritmos e Programação II', workload: 80, description: 'Estruturas de dados' },
              { id: 6, name: 'Estruturas de Dados', workload: 80, description: 'Implementação de estruturas' },
              { id: 7, name: 'Cálculo II', workload: 80, description: 'Cálculo integral' },
              { id: 8, name: 'Física I', workload: 80, description: 'Fundamentos de física' }
            ]
          },
          {
            semesterId: 3,
            semesterNumber: 3,
            disciplines: [
              { id: 9, name: 'Programação Orientada a Objetos', workload: 80, description: 'Paradigma OO' },
              { id: 10, name: 'Banco de Dados I', workload: 80, description: 'Fundamentos de BD' },
              { id: 11, name: 'Álgebra Linear', workload: 80, description: 'Álgebra para computação' },
              { id: 12, name: 'Física II', workload: 80, description: 'Física avançada' }
            ]
          }
        ]
      };
      this.loading = false;
    }, 1000);
  }

  createCurriculum(): void {
    this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', {
      duration: 3000
    });
  }

  exportCurriculum(): void {
    this.snackBar.open('Exportando matriz curricular...', 'Fechar', {
      duration: 3000
    });
  }

  editDiscipline(discipline: any): void {
    this.snackBar.open(`Editando disciplina: ${discipline.name}`, 'Fechar', {
      duration: 3000
    });
  }

  removeDiscipline(discipline: any): void {
    if (confirm(`Tem certeza que deseja remover a disciplina ${discipline.name}?`)) {
      this.snackBar.open('Disciplina removida com sucesso', 'Fechar', {
        duration: 3000
      });
    }
  }

  addDisciplineToSemester(semester: SemesterDisciplines): void {
    this.snackBar.open(`Adicionando disciplina ao ${semester.semesterNumber}º semestre`, 'Fechar', {
      duration: 3000
    });
  }
}
