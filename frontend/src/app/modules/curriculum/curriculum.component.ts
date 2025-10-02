import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CurriculumMatrix, SemesterDisciplines } from '../../shared/models/course.model';

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
          <mat-card-subtitle>Visualize a matriz curricular dos cursos</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="curriculum-content" *ngIf="!loading; else loadingTemplate">
            <div class="course-info" *ngIf="curriculumMatrix">
              <h2>{{ curriculumMatrix.courseName }}</h2>
              <p>Total de semestres: {{ curriculumMatrix.semesters.length }}</p>
              <p>Total de disciplinas: {{ getTotalDisciplines() }}</p>
              <p>Total de horas: {{ getTotalHours() }}h</p>
            </div>

            <mat-accordion multi="true">
              <mat-expansion-panel *ngFor="let semester of curriculumMatrix?.semesters" [expanded]="false">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon>calendar_today</mat-icon>
                    {{ semester.semesterNumber }}º Semestre
                  </mat-panel-title>
                  <mat-panel-description>
                    {{ semester.disciplines.length }} disciplina(s) - {{ getSemesterHours(semester) }}h
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
                      <button mat-button color="primary" (click)="viewDisciplineDetails(discipline)">
                        <mat-icon>visibility</mat-icon>
                        Ver Detalhes
                      </button>
                    </mat-card-actions>
                  </mat-card>
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

    .course-info p {
      margin: 4px 0;
      color: #666;
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
          },
          {
            semesterId: 4,
            semesterNumber: 4,
            disciplines: [
              { id: 13, name: 'Estruturas de Dados Avançadas', workload: 80, description: 'Estruturas complexas' },
              { id: 14, name: 'Banco de Dados II', workload: 80, description: 'BD avançado' },
              { id: 15, name: 'Teoria da Computação', workload: 80, description: 'Fundamentos teóricos' },
              { id: 16, name: 'Estatística', workload: 80, description: 'Estatística aplicada' }
            ]
          },
          {
            semesterId: 5,
            semesterNumber: 5,
            disciplines: [
              { id: 17, name: 'Engenharia de Software I', workload: 80, description: 'Fundamentos de ES' },
              { id: 18, name: 'Redes de Computadores', workload: 80, description: 'Fundamentos de redes' },
              { id: 19, name: 'Sistemas Operacionais', workload: 80, description: 'Fundamentos de SO' },
              { id: 20, name: 'Inteligência Artificial', workload: 80, description: 'Fundamentos de IA' }
            ]
          },
          {
            semesterId: 6,
            semesterNumber: 6,
            disciplines: [
              { id: 21, name: 'Engenharia de Software II', workload: 80, description: 'ES avançada' },
              { id: 22, name: 'Compiladores', workload: 80, description: 'Fundamentos de compiladores' },
              { id: 23, name: 'Grafos', workload: 80, description: 'Teoria e algoritmos em grafos' },
              { id: 24, name: 'Machine Learning', workload: 80, description: 'Aprendizado de máquina' }
            ]
          },
          {
            semesterId: 7,
            semesterNumber: 7,
            disciplines: [
              { id: 25, name: 'Projeto de Software', workload: 80, description: 'Desenvolvimento de projeto' },
              { id: 26, name: 'Segurança da Informação', workload: 80, description: 'Fundamentos de segurança' },
              { id: 27, name: 'Computação Gráfica', workload: 80, description: 'Fundamentos de CG' },
              { id: 28, name: 'Tópicos Avançados', workload: 80, description: 'Tópicos avançados' }
            ]
          },
          {
            semesterId: 8,
            semesterNumber: 8,
            disciplines: [
              { id: 29, name: 'Trabalho de Conclusão de Curso', workload: 160, description: 'Desenvolvimento do TCC' },
              { id: 30, name: 'Estágio Supervisionado', workload: 160, description: 'Estágio supervisionado' }
            ]
          }
        ]
      };
      this.loading = false;
    }, 1000);
  }

  getTotalDisciplines(): number {
    if (!this.curriculumMatrix) return 0;
    return this.curriculumMatrix.semesters.reduce((total, semester) => total + semester.disciplines.length, 0);
  }

  getTotalHours(): number {
    if (!this.curriculumMatrix) return 0;
    return this.curriculumMatrix.semesters.reduce((total, semester) => {
      return total + semester.disciplines.reduce((semesterTotal, discipline) => semesterTotal + discipline.workload, 0);
    }, 0);
  }

  getSemesterHours(semester: SemesterDisciplines): number {
    return semester.disciplines.reduce((total, discipline) => total + discipline.workload, 0);
  }

  viewDisciplineDetails(discipline: any): void {
    this.snackBar.open(`Visualizando detalhes da disciplina: ${discipline.name}`, 'Fechar', {
      duration: 3000
    });
  }
}
