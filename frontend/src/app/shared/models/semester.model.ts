export interface Semester {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  courseId: number;
  course?: {
    id: number;
    name: string;
    code: string;
  };
}
