import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CurriculumMatrix, SemesterDisciplines, Curriculum } from '../../shared/models/course.model';
import { CurriculumService } from '../../shared/services/curriculum.service';
import { KeycloakService } from '../../shared/services/keycloak.service';
import { DisciplineDetailsDialogComponent } from '../../shared/components/discipline-details-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatProgressSpinnerModule,
    MatDialogModule
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

  constructor(
    private snackBar: MatSnackBar,
    private curriculumService: CurriculumService,
    private keycloakService: KeycloakService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCurriculum();
  }

  loadCurriculum(): void {
    this.loading = true;
    const currentUser = this.keycloakService.getCurrentUser();
    
    if (!currentUser || !currentUser.id) {
      this.snackBar.open('Usuário não encontrado', 'Fechar', { duration: 3000 });
      this.loading = false;
      return;
    }

    this.curriculumService.getCurriculaByStudent(currentUser.id).subscribe({
      next: (curricula) => {
        const grouped = this.groupCurriculaByCourse(curricula);
        this.curriculumMatrix = grouped.length > 0 ? grouped[0] : null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar matriz curricular:', error);
        this.snackBar.open('Erro ao carregar matriz curricular', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  private groupCurriculaByCourse(curricula: Curriculum[]): CurriculumMatrix[] {
    const grouped = new Map<number, CurriculumMatrix>();
    
    curricula.forEach(curr => {
      if (!grouped.has(curr.courseId)) {
        grouped.set(curr.courseId, {
          courseId: curr.courseId,
          courseName: curr.courseName || '',
          semesters: []
        });
      }
      
      const matrix = grouped.get(curr.courseId)!;
      let semester = matrix.semesters.find(s => s.semesterId === curr.semesterId);
      
      if (!semester) {
        semester = {
          semesterId: curr.semesterId!,
          semesterNumber: curr.semesterNumber!,
          disciplines: []
        };
        matrix.semesters.push(semester);
      }
      
      semester.disciplines.push({
        id: curr.disciplineId,
        name: curr.disciplineName || '',
        workload: curr.disciplineWorkload || 0,
        description: '',
        active: curr.active
      });
    });
    
    return Array.from(grouped.values());
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
    this.dialog.open(DisciplineDetailsDialogComponent, {
      width: '600px',
      data: { discipline }
    });
  }
}
