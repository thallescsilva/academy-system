export interface Course {
  id?: number;
  name: string;
  description?: string;
  totalHours: number;
  durationSemesters: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  semesters?: Semester[];
}

export interface Semester {
  id?: number;
  number: number;
  courseId?: number;
  courseName?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  disciplines?: Discipline[];
}

export interface Discipline {
  id?: number;
  name: string;
  description?: string;
  workload: number;
  semesterId?: number;
  semesterNumber?: number;
  courseId?: number;
  courseName?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Curriculum {
  id?: number;
  courseId: number;
  courseName?: string;
  disciplineId: number;
  disciplineName?: string;
  disciplineWorkload?: number;
  semesterId?: number;
  semesterNumber?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CurriculumMatrix {
  courseId: number;
  courseName: string;
  semesters: SemesterDisciplines[];
}

export interface SemesterDisciplines {
  semesterId: number;
  semesterNumber: number;
  disciplines: Discipline[];
}
