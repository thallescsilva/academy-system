export interface Curriculum {
  id?: number;
  enrollmentDate: string;
  status: 'ENROLLED' | 'COMPLETED' | 'DROPPED';
  grade?: number;
  studentId: number;
  disciplineId: number;
  student?: {
    id: number;
    name: string;
    email: string;
  };
  discipline?: {
    id: number;
    name: string;
    code: string;
    credits: number;
  };
}
