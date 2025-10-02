import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: 'users',
        loadComponent: () => import('./modules/admin/users/users.component').then(m => m.UsersComponent)
      }
    ]
  },
  {
    path: 'coordinator',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['COORDINATOR'] },
    children: [
      {
        path: 'courses',
        loadComponent: () => import('./modules/coordinator/courses/courses.component').then(m => m.CoursesComponent)
      },
      {
        path: 'semesters',
        loadComponent: () => import('./modules/coordinator/semesters/semesters.component').then(m => m.SemestersComponent)
      },
      {
        path: 'disciplines',
        loadComponent: () => import('./modules/coordinator/disciplines/disciplines.component').then(m => m.DisciplinesComponent)
      },
      {
        path: 'curriculum',
        loadComponent: () => import('./modules/coordinator/curriculum/curriculum.component').then(m => m.CurriculumComponent)
      }
    ]
  },
  {
    path: 'curriculum',
    loadComponent: () => import('./modules/curriculum/curriculum.component').then(m => m.CurriculumComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PROFESSOR', 'STUDENT'] }
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
