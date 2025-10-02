export interface Semester {
  id?: number;
  number: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  active: boolean;
  courseId: number;
  courseName?: string;
  createdAt?: string;
  updatedAt?: string;
  course?: {
    id: number;
    name: string;
    code: string;
  };
}
